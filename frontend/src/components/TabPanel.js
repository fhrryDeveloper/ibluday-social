import Box from "@material-ui/core/Box";
import PropTypes from 'prop-types';
import Scrollbars from "react-custom-scrollbars";

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
  
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Scrollbars style={{ height : 400 }}>
                    <Box>
                        {children}
                    </Box>
                </Scrollbars>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default TabPanel;