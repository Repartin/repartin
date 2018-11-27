import React from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import TopCard from "../Common/TopCard";
import ListCard from "../Common/ListCard";
import Toolbar from "../Common/Toolbar";
import styles from "./styles";

const View = ( { expenses, card, handleSearch, handleFilter, handleQuickTip, classes } ) => {

  return (
    <>
      <Toolbar 
        handleSearch={ handleSearch }
        handleFilter={ handleFilter }
      />
      <TopCard card={ card } handleQuickTip={ handleQuickTip }/>
      <ListCard />
      <ListCard />
      <ListCard />
      <Button className={ classes.addButton } variant="fab" color="primary">
        <AddIcon></AddIcon>
      </Button>
    </>
  );
}

export default withStyles( styles )( View );