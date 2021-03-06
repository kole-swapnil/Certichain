import React, { Component } from 'react';
//import moment from 'moment';
import {Button,Form,FormGroup,Label,Input,Col,Card,CardImg,CardTitle,CardBody,CardText,Modal,ModalHeader,ModalBody} from 'reactstrap';

import Web3 from 'web3';


let allcoll = [];
let alldocs = [];
const ETHER = 1000000000000000000;

class Allpatrender extends Component {
    // let day = moment.unix(art.dateofComp);
    // let xy = art.dateofComp;
    // let date = new Date(xy*1000);
    // let time = day.format('dddd MMMM Do YYYY, h:mm:ss a');
    // let yz = xy != 0?"bg-success text-white":"";
    constructor(props) {
        super(props);
        this.state = {
            docCount: 0,
            art: [],
            isModalOpen: false,
            sellPrice: 0
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.togglereg = this.togglereg.bind(this);
    }

    togglereg = async () => {
        if(this.props.art.isregistered){
            const res = await this.props.contract.methods
            .registerCollege(
                this.props.art.clg_id,
                false
            )
            .send({ from: this.props.accounts, gas: 1000000 });
        }
        else{
            const res = await this.props.contract.methods
            .registerCollege(
                this.props.art.clg_id,
                true
            )
            .send({ from: this.props.accounts, gas: 1000000 });
     
        }
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }


    render() {  
                //let but = ;
                let but = this.props.owner == this.props.accounts?'visible':'invisible';;
                let butname = this.props.art.isregistered?'Unregister':'register';
        return (
                <Card >
                <i className="fa fa-institution fa-4x"></i>
                <CardBody>
                <CardTitle><small>College ID : {this.props.art.clg_id}</small></CardTitle>
                <CardText><small>College Address : {this.props.art.clg_address}</small></CardText>
                <CardText><small>College Name : {this.props.art.clg_name}</small></CardText>
                <CardText><small>Registration Status : {this.props.art.isregistered?'True':'False'}</small></CardText>
                <Button className={but} type="submit" color="primary" onClick={this.togglereg}>
                    {butname}
                </Button>
                </CardBody>
            </Card>
        );
    }
}

class  AllCllgComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            docCount: 0,
            art: [],
            cust: [],
            manuf: [],
            clgname: '',
            isModalOpen1: false,
            title: '',
            artUrl: '',
            price: '',
            artHash: '',
            perCut: 0,
            owner:''
        };
        this.toggleModal1 = this.toggleModal1.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.fileSelectHandler = this.fileSelectHandler.bind(this);
        this.creatingItems = this.creatingItems.bind(this);


    }

    toggleModal1() {
        this.setState({
            isModalOpen1: !this.state.isModalOpen1
        });
    }

    creatingItems = async () => {
       
       
        const res = await this.props.contract.methods
            .addCollege(
                this.state.clgname
            )
            .send({ from: this.props.accounts, gas: 1000000 });
        console.log(res);
        console.log(this.state.clgname);
        this.toggleModal1();
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    async componentDidMount() {
        var res = await this.props.contract?.methods.owner().call();
        console.log(res);
        this.setState({owner : res});
    }

    fileSelectHandler = (event) => {
        console.log(event.target.files);
        this.setState({
            selectedFile: event.target.files[0]
        });
    };





    render() {
        const Menu = this.props.art?.map((x) => {
            return (
                <div key={x} className='col-4 col-md-3'>
                    <Allpatrender
                        art={x}
                        owner={this.state.owner}
                        contract={this.props.contract}
                        accounts={this.props.accounts}
                    />
                    <br />
                    <br />
                </div>
            );
        });

        let ch = 'visible';
        return (
            <div className='container'>
                <h2>All College</h2>
                <Button
                    color='success'
                    className={ch}
                    onClick={this.toggleModal1}>
                    Add College
                </Button>

                <Modal
                    isOpen={this.state.isModalOpen1}
                    toggle={this.toggleModal1}
                    className='modal-xl'>
                    <ModalHeader toggle={this.toggleModal1}>
                        <h3>Add College</h3>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <div className='row pl-5 pr-5'>
                                <div className='col-6'>
                                    <FormGroup>
                                        <Label htmlFor='title' className='ml-3'>
                                            College Name
                                        </Label>
                                        <Input
                                            type='text'
                                            id='clgname'
                                            name='clgname'
                                            onChange={this.handleInputChange}
                                        />
                                    </FormGroup>
                                </div>
                               
                            </div>
                           
                            <br />
                            <div className='row pl-5'>
                                <div className='col-6'>
                                    <Button
                                        color='primary'
                                        onClick={this.creatingItems}
                                        >
                                        Add
                                    </Button>
                                </div>
                            </div>
                            <br />
                        </Form>
                    </ModalBody>
                </Modal>
                <br />
                <br />
                <div className='row'>{Menu}</div>
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        );
    }
}

export default AllCllgComponent;
