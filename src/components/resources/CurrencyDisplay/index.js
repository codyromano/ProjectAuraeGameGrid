import React from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';
import { CLASS_CURRENCY } from '../../../store/actions';

const gridContainerProps = {
  fullWidth: true,
  container: true,
  alignContent: 'space-around'
};

const CurrencyDisplay = ({ currencies }) => {
  const icon = <Icon>restore</Icon>;

  return (
    <Grid {...gridContainerProps}>
      {currencies.map(currency => (
        <Grid item xs={4} alignContent='center'>
          {currency.name}: {currency.amount}
        </Grid>
      ))}
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  currencies: state.resources.byClass[CLASS_CURRENCY]
    .map(id => state.resources.byId[id])
});
export default connect(mapStateToProps)(CurrencyDisplay);
