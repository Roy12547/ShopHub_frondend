import styled from 'styled-components';


export const StyledImageBox = styled.div`

    
    .box{
        position: relative;
        overflow: hidden;
    }

    .del_layer{
        position:absolute;
        bottom:-30%;
        width: 100%;
        height:30%;
        background-color:rgba(104, 109, 118, 0.8);
        transition: bottom 0.2s ease-in-out;
        cursor: pointer;
    }
    .del_icon{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        transition: bottom 0.2s ease-in-out;
        cursor: pointer;
    }

    .box:hover .del_layer{
        bottom:0;
    }
    .box:hover .del_icon{
       transform: translate(-50%, -50%);
    }

    
`;