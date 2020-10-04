import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const Alert = ({alerts}) => (
    alerts !== null &&
    alerts.length > 0 &&
    <div className={`alert alert-${alert.alertType}`}>
        {alert.msg}
    </div>

    // alerts !== null &&
    // alerts.length > 0 &&
    // alerts.map(alert => (
    //     <div key={alert.id} className={`alert alert-${alert.alertType}`}>
    //         {alert.msg}
    //     </div>
    // ))
);

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);

// import React from 'react';
// import PropTypes from 'prop-types';
// import Alert from "react-bootstrap";
// const AlertMsg = ({msg, type}) => {
//     return (
//         <Alert varient={type} >
//             { msg }
//         </Alert>
//     );
// };
//
// AlertMsg.propTypes = {
//     msg: PropTypes.string.isRequired,
//     type: PropTypes.string.isRequired
// };
//
// export default AlertMsg;