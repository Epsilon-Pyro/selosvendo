var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ServSchema = new Schema ({
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
	especializacion: {
    type: String,
    default: '',
    trim: true,
	},
	
	ubicacion:{
    type: String,
    default: '',
    trim: true,
    required: 'ubicación no puede estar en blanco'
    },
	precio: {
    type: String,
    default: '',
    trim: true,
    
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
    required: ' imagen1 no puede estar en blanco'
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

mongoose.model('Serv', ServSchema);