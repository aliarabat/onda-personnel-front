import Swal from 'sweetalert2';

export class SwalUtil {



  public static wrongEmailOrPassword() {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: "L'email ou le mot de passe est incorrect!",
    })
  }

  public static changeWarning() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-outline-success',
        cancelButton: 'btn btn-outline-danger'
      },
      buttonsStyling: false,
    });

    return swalWithBootstrapButtons.fire({
      title: 'Etes vous sure?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, je confirme!',
      cancelButtonText: 'Annuler',
      reverseButtons: true
    })
  }

  public static actionCanceled() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-outline-success',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons.fire(
      'Action anullee!',
    )
  }

  public static changesSavedSuccessfully() {
    Swal.fire({
      type: 'success',
      title: 'Changements sauvegardes avec succes !',
      showConfirmButton: false,
      timer: 1500
    })
  }

  public static emailNotFound() {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: 'Aucun utilisateur trouve avec l\'email que vous avez entre!',
    })
  }

  public static oldPasswordNotCorrect() {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: 'Ancien mot de passe incorrect'
    })
  }

  public static unkownError() {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: 'Erreur inconnue'
    })
  }

  public static userAlreadyExists() {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: 'L\'utilisateur existe deja'
    })
  }

  public static unableToConnect() {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: 'Nous ne pouvons pas nous connecter à Internet pour le moment ...'
    })
  }

  public static emailSent() {
    Swal.fire({
      type: 'success',
      title: 'Okay',
      text: 'Si l\'email que vous avez entré est valide, vous trouverez un email de notre part dans votre boîte de réception.'
    })
  }

  public static invalidLink() {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: 'Le lien que vous avez entré est invalide ...',
      timer:1700
    })
  }

  public static blockedUser() {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: 'Votre compte est blocké pour le moment, veuillez contacter votre administrateur ...',
      timer:1700
    })
  }

  public static insert(subject:string){
    Swal.fire({
      type: 'error',
      title: 'Oops...!',
      text: 'Merci de saisir '+subject
    });
  }

  public static select(subject:string){
    Swal.fire({
      type: 'error',
      title: 'Oops...!',
      text: 'Merci de choisir '+subject
    });
  }

  public static alreadyExist(subject:string){
    Swal.fire({
      type: 'error',
      title: 'Oops...!',
      text: subject+' existe déja'
    });
  }

  public static passed(subject:string){
    Swal.fire({
      type: 'error',
      title: 'Oops...!',
      text: 'Vous avez dépassé '+subject
    });
  }

  public static deleted(subject:string, text:string){
    Swal.fire({
      type: 'success',
      title: 'Suppression de '+subject,
      text: text
    });
  }

  public static updateOf(subject:string, othermessage?:string){
    Swal.fire({
      type: 'success',
      title: 'Modification de '+subject,
      text: 'Modification de '+!!othermessage?othermessage:subject+' réussite'
    });
  }

  public static fillTheTable(){
    Swal.fire({
      type: 'warning',
      title: 'Opss..!',
      text: 'Merci de remplir le tableau'
    });
  }

  public static veridyData(subject:string){
    Swal.fire({
      type: 'warning',
      title: 'Oops...',
      text: 'Merci de verifier '+subject
    });
  }

  public static any(title:string, text:string){
    Swal.fire({
      type: 'error',
      title: title,
      text: text
    });
  }
}
