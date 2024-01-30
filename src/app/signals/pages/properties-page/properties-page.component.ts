import { Component, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces/users-request.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css'
})
export class PropertiesPageComponent {

  public counter = signal(10);

  public user = signal<User>({
    id: 1,
    email: 'george.bluth@reqres.in',
    first_name: 'George',
    last_name: 'Bluth',
    avatar: 'https://reqres.in/img/faces/1-image.jpg'
  });

  public fullName = computed( () => `${this.user().first_name} ${this.user().last_name}`)

  public userChangedEffect = effect( () => {

    console.log('user effect change triggered');

    console.log( this.user().first_name, ' - ', this.counter() );


  })

  increaseBy(value: number){
    this.counter.update( current => current + value)
  }

  onFieldUpdated( field: keyof User, value: string) {

    // opcion 1
    // this.user.set({
    //   ...this.user(),
    //   [field]: value,
    // })

    // opcion 2
    // this.user.update( current => ({
    //   ...current,
    //   [field]: value,
    // }))

    // opcion 3
    this.user.update( current => {

      switch( field ){

        case 'first_name' :
          current.first_name = value;
          break;

        case 'last_name' :
          current.last_name = value;
          break;

        case 'email' :
          current.email = value;
          break;

        case 'id':
          current.id =  Number(value);

      }

      return current;

    })
  }
}
