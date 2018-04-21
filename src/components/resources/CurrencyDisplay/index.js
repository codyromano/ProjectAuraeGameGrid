import React from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import './currencyDisplay.css';
import { CLASS_CURRENCY } from 'aurae-resource-classes';

const gridContainerProps = {
  container: true,
  alignContent: 'center',
  justify: 'center'
};

const CurrencyDisplay = ({ currencies }) => {
  return (
    <div className="currency-display">
      <Paper>
        <div className="currency-display-inner-wrapper">
          <Grid {...gridContainerProps}>
            {currencies.map(currency => (
              <Grid key={currency.name} item xs={3} justify="center"
                className="resource-item">
                <img className="currency-icon" alt={currency.iconAlt} src={currency.iconSrc} />
                <span className="currency-amount">{currency.stats.amount}</span>
              </Grid>
            ))}
          </Grid>
        </div>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currencies: state.resources.byClass[CLASS_CURRENCY]
    .map(id => state.resources.byId[id])
});
export default connect(mapStateToProps)(CurrencyDisplay);
