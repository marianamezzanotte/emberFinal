import Route from '@ember/routing/route';

export default Route.extend({
  ajax: Ember.inject.service(),

  comensales : null,

  model(params, transition) {
    return this.get('ajax').request('http://web-unicen.herokuapp.com/api/thing/group/333');
  },

 actions:
 {
   guardar(nombrereceta, categoria, time){
     this.get('ajax').post('http://web-unicen.herokuapp.com/api/thing/', { data: {group: 333 , thing:{ nombrereceta: nombrereceta, categoria: categoria, comensales: this.get('comensales'), tiempococ: time } }});
     this.refresh();
   },

   borrar(id){
     this.get('ajax').del('http://web-unicen.herokuapp.com/api/thing/'+id);
     this.refresh();

   },

   modificar(){
     let receta = this.controllerFor('cargar-receta').get('recetaSeleccionada');
     this.get('ajax').put('http://web-unicen.herokuapp.com/api/thing/'+receta._id, {
        data: {
          group: 333 ,
          thing:{
            nombrereceta: receta.thing.nombrereceta,
            categoria: receta.thing.categoria,
            comensales: this.get('comensales'),
            tiempococ: receta.thing.tiempococ
          }
        }
      });
     this.controllerFor('cargar-receta').set('isUpdating', false);
     this.refresh();
   },

   selectComensales(evt) {
     this.set('comensales', evt.target.value);
   },

   showUpdate(selectedThing, evento){
      this.controllerFor('cargar-receta').set('isUpdating', true);
      this.controllerFor('cargar-receta').set('recetaSeleccionada', Object.assign({}, selectedThing));
      //this.refresh();
    },

    cancelUpdate(evt){
      evt.preventDefault();
      this.controllerFor('cargar-receta').set('isUpdating', false);
    }
  }

});
