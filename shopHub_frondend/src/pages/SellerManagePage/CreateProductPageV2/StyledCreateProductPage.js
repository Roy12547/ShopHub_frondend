import styled from 'styled-components';
import { keyframes } from 'styled-components'


const pulse=keyframes`
    from {
        transform: scale(0.9);
        opacity: 1;
    }

    to {
        transform: scale(1.8);
        opacity: 0;
    }
`

export const StyledCreateProductPage = styled.div`

 
    .section_title {
        text-align: left;
        font-weight: 900;
        font-size: 30px;
        color: rgb(16, 137, 211);
        position: relative;
        display: flex;
        align-items: center;
        padding-left: 30px;

        &::before,&::after{
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            border-radius: 50%;
            left: 0px;
            background-color: royalblue;
        }

        &::before {
            width: 18px;
            height: 18px;
            background-color: royalblue;
        }

        &::after {
            width: 18px;
            height: 18px;
            animation: ${pulse} 1s linear infinite;
        }   
    }   

    .form{
        /* width: 90%; */
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap:4rem;
    }

    

    .section_wrap{
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap:3rem;
        width: 100%;
        height: fit-content;
        background: #FFFFFF;
        box-shadow: 0px 187px 75px rgba(0, 0, 0, 0.01), 0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09), 0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
        border-radius: 26px;
    }
    
    .label{
        font-weight: 500;
        font-size: 1.1rem;
    }

    .required{
        &::before{
            content: "*";
            color:red;
            padding-right: 0.2rem;
        }
    }
    .input_group{
        display: flex;
        flex-direction: row;
        gap:0.5rem;
        align-content: "center";
    }

    .input_wrap{
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .input {
        line-height: 30px;
        padding: 0 1rem;
        /* padding-left: 1rem; */
        border: 2px solid transparent;
        border-radius: 10px;
        outline: none;
        background-color: #f8fafc;
        color: #0d0c22;
        transition: .5s ease;
        border: 1px solid gray;
    }

    .input::placeholder {
        color: #94a3b8;
    }
    .input:focus, input:hover {
        outline: none;
        border-color: rgba(129, 140, 248);
        background-color: #fff;
        box-shadow: 0 0 0 5px rgb(129 140 248 / 30%);
    }

    select {
        // A reset of styles, including removing the default dropdown arrow
        appearance: none;
        background-color: transparent;
        border: none;
        padding: 0 1em 0 0;
        margin: 0;
        width: 100%;
        

        // Stack above custom arrow
        z-index: 1;

        // Remove dropdown arrow in IE10 & IE11
        // @link https://www.filamentgroup.com/lab/select-css.html
        &::-ms-expand {
            display: none;
        }

        // Remove focus outline, will add on alternate element
        outline: none;
        }

        .select {
            display: grid;
            grid-template-areas: "select";
            align-items: center;
            position: relative;

            select,
            &::after {
                grid-area: select;
            }

            min-width: 15ch;
            max-width: 30ch;

            border: 1px solid var(#777);
            border-radius: 0.25em;
            padding: 0.25em 0.5em;

            font-size: 1.25rem;
            cursor: pointer;
            line-height: 1.1;

            // Optional styles
            // remove for transparency
            background-color: #A0DEFF;
            background-image: linear-gradient(to top, #f9f9f9, #fff 33%);

        // Custom arrow
        &:not(.select--multiple)::after {
            content: "";
            justify-self: end;
            width: 0.8em;
            height: 0.5em;
            background-color: var(#777);
            clip-path: polygon(100% 0%, 0 0%, 50% 100%);
        }

        /* image preview box */
        .img_box {
            position: relative;
            overflow: hidden;
            width: 80px;
            height: 80px;
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

        .img_box:hover .del_layer{
            bottom:0;
        }
        .img_box:hover .del_icon{
            transform: translate(-50%, -50%);
        }
}


`;