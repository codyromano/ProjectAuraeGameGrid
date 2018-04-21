import React from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import { CLASS_CURRENCY } from 'aurae-resource-classes';

const gridContainerProps = {
  container: true,
  alignContent: 'center'
};

const CurrencyDisplay = ({ currencies }) => {
  return (
    <Grid {...gridContainerProps}>
      {currencies.map(currency => (
        <Grid key={currency.name} item xs={4}>
          {currency.name}: {currency.stats.amount}
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
