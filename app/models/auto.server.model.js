var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AutoSchema = new Schema ({
     creado: {
    type: Date,
    default: Date.now
  },
 tipo: {
    type: String,
    default: '',
    trim: true,
    required: 'tipo no puede estar en blanco'
    },
	marca: {
    type: String,
    default: '',
    trim: true,
    required: 'marca no puede estar en blanco'
    },
	modelo: {
    type: String,
    default: '',
    trim: true,
    required: 'modelo no puede estar en blanco'
    },
	ano: {
    type: Number,
    default: '',
    trim: true,
    required: 'Año no puede estar en blanco'
    },
	transmision: {
    type: String,
    default: '',
    trim: true,
    required: 'transmisión no puede estar en blanco'
    },
	ubicacion:{
    type: String,
    default: '',
    trim: true,
    required: 'ubicación no puede estar en blanco'
    },
	precio: {
    type: Number,
    default: '',
    trim: true,
    required: 'precio no puede estar en blanco'
    },
	
	aireacnd:{
    type: String,
    default: '',
    trim: true,
    required: 'aire acondicionado no puede estar en blanco'
    },
	vidriosyseguros: {
    type: String,
    default: '',
    trim: true,
    required: 'Vidrios y seguros no puede estar en blanco'
    },
	alarma: {
    type: String,
    default: '',
    trim: true,
    required: 'Alarma no puede estar en blanco'
    },
	sonido: {
    type: String,
    default: '',
    trim: true,
    required: ' Sonido no puede estar en blanco'
    },
  descripcion: {
    type: String,
    default: '',
    trim: true
  },
  imagen1: {
    type: String,
    default: '',
    trim: true,
    required: ' no puede estar en blanco'
    },
	
	imagen2: {
    type: String,
    default: '',
    trim: true,
   
    },
	
	imagen3: {
    type: String,
    default: '',
    trim: true,
    
    },
	
	imagen4: {
    type: String,
    default: '',
    trim: true,
    
    },
	
	imagen5: {
    type: String,
    default: '',
    trim: true,
    
    },
	
	
	estado: {
    type: String,
    default: '',
    trim: true,
    required: ' estado no puede estar en blanco'
    },
	
	
	nombre: {
    type: String,
    default: '',
    trim: true,
    required: 'Nombre no puede estar en blanco'
    },
	
	apellido: {
    type: String,
    default: '',
    trim: true,
    required: 'Apellido no puede estar en blanco'
    },
	
	cedula: {
    type: Number,
    default: '',
    trim: true,
    required: 'Cédula no puede estar en blanco'
    },
  creador: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Auto', AutoSchema);