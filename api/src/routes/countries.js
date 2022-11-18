const { Router } = require('express');
const axios = require("axios");
const router = Router();
const { Op, Country, Activities } = require('../db');


//hacemos un get a la ruta '/countries/'
router.get('/', async (req, res) =>{
    const {name, activity} = req.query;
    //si name existe, y ademas tiene un contenido hacemos una busqueda en la 
    //base de datos 
    if( name && name.length > 0) {
        console.log('entre por query')
        try{
            const countries = await Country.findAll({
                where:{
                    [Op.or]: [
                        {
                            //buscamos paises que comiencen con lo que se nos pasa por query
                          name: {
                            [Op.iLike]: `${name}%`
                          }
                        },
                        {
                            traduccion: {
                            [Op.iLike]: `${name}%`
                          }
                        }
                      ]
                    
                },
                include: Activities
            })
            res.status(200).json(countries);
        }catch(e){
            console.log(e)
        }
    }else{
        try{
            //en caso que no se nos pase nada por query 
            //pedimos todos los paises
            console.log('pase el query de largo')
            const thecountries = await Country.findAll({
                include: Activities
            });
            //primero vemos si los tenemos en la base de datos
            //de ser asi, los retornamos 
            if(thecountries.length) res.status(200).json(thecountries);
            else{
                //caso contrario se consulta a la API
                //una ves creada la base de datos, no se hace mas esta consulta
                //esto nos ayudara en caso de que tengamos que dropear las tablas por algun motivo
                const allCountries = await axios.get(
                    `https://restcountries.com/v3/all`
                );
                console.log('sigo aca')
                //seleccionamos cuidadosamente la informacion que necesitamos (la que hemos
                //puesto en el modelo de "country")
                const country = allCountries.data.map( info => {
                    const o = {
                    id: info.cca3,
                    name: info.name.common,
                    traduccion: info.translations.spa.common,
                    capital: info.capital || ["No registered capital"],
                    subregion: info.subregion || "No registered subregion",
                    area: info.area,
                    population: info.population,
                    flag: info.flags[1],
                    continent: info.region,
                }
                try{
                        Country.findOrCreate({
                            where:{
                                name: o.name,  
                            },
                            defaults: o,
                        })
                    }catch(e){
                        console.log(e)
                    }
                    return o
                });
                console.log('termino aca')
                res.json(country);
            }
        }catch(e){
            res.json(e);
        }
    }
    
})

//hacemos un get a '/countries/:id'
router.get("/:id", async (req, res) =>{
    const {id} = req.params;
    try{
        //hacemos una consulta a la base de datos para encontrar el pais en base al id
        const country = await Country.findByPk(id, { include: Activities})
        res.status(200).json(country);

    }catch(e){
        console.log(e)
    }
})


module.exports = router;