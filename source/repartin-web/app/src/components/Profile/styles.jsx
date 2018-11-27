import { createStyles } from "@material-ui/core/";

export default ( theme ) => {

  return createStyles( {
    houseBackground: {
      position: "relative",
      height: "172px",
      margin: "-16px -16px 0 -16px"
    },
    backButton: {
      zIndex: "2"
    },
    houseImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    },
    houseImageOverlay: {
      position: "absolute",
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
      backgroundColor: "rgba( 0, 0, 0, .65 )",
      zIndex: "1"
    },
    info: {
      position: "relative",
      transform: "translateY( -78px )",
      zIndex: "1"
    },
    house: {
      paddingTop: "1.4rem"
    },
    actions: {
      display: "flex",
      justifyContent: "center",
      paddingTop: "3.8rem"
    },
    action: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "66px",
      width: "66px",
      minWidth: "initial",
      margin: "0 1.2rem",
      borderRadius: "50%"
    },
    actionIcon: {
      fontSize: "2.6em"
    }
  } );
}