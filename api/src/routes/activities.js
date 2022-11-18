const { Router } = require('express');
const axios = require("axios");
const router = Router();
const { Country, Activities, Op } = require('../db');

router.get('/', async (req, res) => {
    try{
      const activties = await Activities.findAll({ include: Country });
      res.json(activties);

    }catch(e){
      console.log(e)
    }
  }
)

router.get('/:id', async (req, res) =>{
  const {id} = req.params;
  try {
    const activity = await Activities.findByPk(id, {include: Country});
    res.status(200).json(activity)
  } catch (e) {
    console.log(e)
  }
})

router.delete('/:id', async (req, res) => {
  const {id} = req.params;
  try{
    await Activities.destroy({
      where:{
        id: id
      }
    });
    res.json('Actividad borrada correctamente')
  }catch(e){
    console.log(e)
  }
})
//hacemos un post a la ruta '/activities/
router.post('/', async (req, res) =>{
  //recibimos por body informacion 
  const { name, nombre, dificultad, duracion, temporada} = req.body;
  if( !name || !nombre || !dificultad || duracion.length == 0 || !temporada){
    //de no tener la informacion necesaria para crear la actividad (modelo activities)
      res.status(404).send("No se recibieron los parametros necesarios");
  }
  try{
    //si la informacion es la necesaria, buscamos si la actividad existe, caso contrario 
    //se crea una nueva
    const activity = await Activities.findOrCreate({
      where:{
        nombre: nombre
      },
      defaults: req.body
    })
    let arr = []
    //por el argumento 'name' del body, podemos recibir un arreglo de paises a los que 
    //hay que asignarles las actividades, por lo que tenemos que tenemos que hacer un ciclo for
    //para conseguir los respectivos paises
    for(let i = 0; i < name.length; i++){
      const country = await Country.findOne({where:{ 
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `${name[i]}%`
            }
          },
          {
              traduccion: {
              [Op.iLike]: `${name[i]}%`
            }
          }
        ]
      }});
      arr.push(country);
    }
    //luego se le asocia la actividad a cada pais
    activity[0].addCountries(arr);
    
    res.json('Activididad creada correctamente.')
  }catch(e){
    console.log(e)
  }
})

module.exports = router;