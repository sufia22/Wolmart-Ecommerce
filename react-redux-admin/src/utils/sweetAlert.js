import swal from "sweetalert";

// sweet alert basic
export const sweetAlertBasic = (msg) => {
  swal(msg);
};

// sweet alert standard
export const sweetAlertStandard = (msg, type = "success") => {
  swal(msg.title, msg.msg, type);
};

// sweet alert confirmation
export const sweetAlertConfirmation = (msg, type = "success") => {
  swal({
    title: msg.title,
    text: msg.msg,
    icon: type,
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal("Poof! Your imaginary file has been deleted!", {
        icon: "success",
      });
    } else {
      swal("Your imaginary file is safe!");
    }
  });
};
