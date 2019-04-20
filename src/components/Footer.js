import React from 'react';

class Footer extends React.Component {
    render() {
        return(
            <footer 
                style = {{
                    textAlign:'center', 
                    marginTop: '50px', 
                    fontSize: '14px', 
                    color: 'rgb(116, 116, 116)'
                }}
            >
                &copy; Dmitry Saveliev, 2019
            </footer>
        );
    }
}

export default Footer;