import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { requestsService } from './../all.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  eventPizzaForm!: FormGroup
  pizzaData: any = []
  getFile: any
  pizzaId: any
  pizzaPhoto: any
  modalAdd = false
  modalEdit = false
  modalPhotoPizza = false

  constructor(private request: requestsService) { }

  ngOnInit() {
    this.eventPizzaForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
    })

    this.request.getRequest('pizza/').subscribe(response => {
      this.pizzaData = response
    }, error => {
      this.request.error(error)
    })
  }

  fullPizzaPhoto(photo: any) {
    this.pizzaPhoto = photo
    this.modalPhotoPizza = true
  }

  file(event: any) {
    let reader = new FileReader()
    reader.readAsDataURL(event.target.files[0])
    reader.onload = () => {
      this.getFile = reader.result
    }
  }

  openModalAdd() {
    this.modalAdd = true
  }

  addPizzaButton() {
    const eventPizzaFormData = { ...this.eventPizzaForm.value }
    console.log(eventPizzaFormData);
    this.request.postRequest('pizza/', {"name": eventPizzaFormData.name, "price": eventPizzaFormData.price, "photo": this.getFile}).subscribe(response => {
      this.modalAdd = false
      location.reload()
    }, error => {
      this.request.error(error)
    })
  }

  openModalEdit(id: number, photo: any) {
    this.pizzaId = id
    this.getFile = photo
    this.modalEdit = true
    this.eventPizzaForm.patchValue(this.pizzaData.filter( (res: any) => res.id == id )[0])
  }

  editPizzaButton() {
    const eventPizzaFormData = { ...this.eventPizzaForm.value }
    this.request.putRequest(`pizza/${this.pizzaId}/`, {"name": eventPizzaFormData.name, "price": eventPizzaFormData.price, "photo": this.getFile}).subscribe(response => {
      this.modalEdit = false
      location.reload()
    }, error => {
      this.request.error(error)
    })
  }

  deletePizza(id: number, name: string) {
    let permition = confirm('Вы хотите удалить ' + name)
    if(permition == true) {
      this.request.deleteRequest(`pizza/${id}/`).subscribe(response => {
        location.reload()
      }, error => {
        this.request.error(error)
      })
    }
  }

}
