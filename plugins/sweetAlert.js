import Swal from "sweetalert2";

export default function({}, inject) {

  // $api.onRequest((config) => {
  //   if (config.method == 'delete'){
  //     Swal.bindClickHandler()
  //   }
  // })


  const toast = Swal.mixin({
    toast: true,
    timer: 3000,
    padding: "0.5rem",
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
    position: "top-end",
    showConfirmButton: false,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  // Inject to context as $toast
  inject("toast", toast);
}
