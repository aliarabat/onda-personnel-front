import Swal from 'sweetalert2';

export class SwalUtil {



  public static wrongEmailOrPassword(){
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: "L'email ou le mot de passe est incorrect!",
    })
  }

  public static changeWarning(){
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

  public static actionCanceled(){
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

  public static changesSavedSuccessfully(){
    Swal.fire({
      type: 'success',
      title: 'Changements sauvegardes avec succes !',
      showConfirmButton: false,
      timer: 1500
    })
  }

  public static  emailNotFound(){
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: 'Aucun utilisateur trouve avec l\'email que vous avez entre!',
    })
  }

  public static oldPasswordNotCorrect(){
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: 'Ancien mot de passe incorrect'
    })
  }

  public static  unkownError(){
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: 'Erreur inconnue'
    })
  }

  public static userAlreadyExists(){
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: 'L\'utilisateur existe deja'
    })
  }
}
