import React, { Fragment, useEffect, useState } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editInvestment, getCurrentInvestment, getCurrencies } from '../../_actions/investmentAction'
import { getProjects } from '../../_actions/projectAction'
import '../UI/Dashboard.css'
import { Link } from "react-router-dom";
import moment from 'moment';

const EditInvestment = ({
    investment: { investment, loading },
    getCurrencies,
    history,
    editInvestment,
    getCurrentInvestment,
    getProjects,
    match,
    projects,
    currencies


}) => {

    const [formData, setFormData] = useState({
        project: "",
        amount: "",
        projectName: "",
        currency: "",
        date: new Date(),
        image: "",
        convAmt: "",
    });

    //format('2013-03-10T02:00:00Z', 'YYYY-MM-DD'); 
    useEffect(() => {
        getCurrencies();
        getProjects();
        getCurrentInvestment(match.params.id);
        setFormData({
            amount: loading || !investment.amount ? "" : investment.amount,
            currency: loading || !investment.currency ? "" : investment.currency,
            convAmt: loading || !investment.convAmt ? "" : investment.convAmt,
            date: loading || !investment.date ? "" : moment(investment.date).format('YYYY-MM-DD'),
            project: loading || !investment.project ? "" : investment.project._id,
            image: loading || !investment.image ? "" : investment.image
        });
        //eslint-disable-next-line
    }, [loading, getCurrentInvestment, getProjects]);

    const { amount, currency, date, project, image } = formData;

    const onChangeHandler = e => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value, convAmt: result, projectName: name });
        //console.log(formData)

    };

    console.log(formData)
    let newDetail = []
    newDetail = projects.filter(x => x._id === project)
    //console.log(newDetail);

    let name = newDetail.map(nd => (
        nd.projectName

    ))

    const onChangeImage = e => {
        e.preventDefault();
        setFormData({ ...formData, image: e.target.files[0] });
    };


    const result = (amount / currencies[currency]).toFixed(2)
    //console.log({ result })



    const onSubmitHandler = e => {
        e.preventDefault();

        // for uploading images send file as blob multipart/form-data
        let formData = new FormData();

        formData.append("image", image);
        formData.append("project", project);
        formData.append("projectName", name);
        formData.append("amount", amount);
        formData.append("currency", currency);
        formData.append("date", date);
        formData.append("convAmt", result);
        editInvestment(formData, history, match.params.id);
    };

    // let isoDate = "2013-03-10T02:00:00Z";
    // var d = new Date(isoDate);
    // d.toLocaleDateString('en-GB'); // dd/mm/yyyy
    // d.toLocaleDateString(''); // mm/dd/yyyy



    let projectOption = projects.map(pro => (
        <option key={pro._id} value={pro._id} >
            {pro.projectName}
        </option>
    ));

    return (
        <Fragment>

            <div className="container-fluid">
                <form encType="multipart/form-data" onSubmit={e => onSubmitHandler(e)}>
                    <section className="login py-2 border-top-1">
                        <div className="container">
                            <div className="row justify-content-center animated fadeIn">
                                <div className="col-lg-7 col-md-10 align-item-center">
                                    <div className="bg-light border border-success">
                                        <div>
                                            <h3 className="bg-success text-center text-white p-4"><Link to="/admin/viewinvestment" className="text-white"><i className="fa fa-arrow-left mr-2 float-left"></i></Link> Edit Investment</h3></div>
                                        <fieldset className="p-4">


                                            <select
                                                className="border p-3 w-100 my-2"
                                                name="project"
                                                value={project}
                                                //selected={project}
                                                onChange={e => onChangeHandler(e)} >
                                                <option>Select Project</option>
                                                {projectOption}
                                            </select>

                                            <input
                                                name="projectName"
                                                type="hidden"
                                                value={name[0]}
                                            //onChange={e => onProjectHandler2(e)}
                                            />

                                            <select className="border p-3 w-100 my-2"
                                                onChange={e => onChangeHandler(e)}
                                                name="currency"
                                                value={currency}>

                                                <option value="" className="form-control">--Select Currency--</option>
                                                <option value="INR">INR-Indian Rupees</option>
                                                <option value="USD">USD-US DOLLAR</option>
                                                <option value="SAR">SAR-Saudi Riyal</option>
                                                <option value="OMR">OMR-Omani Riyal</option>
                                                <option value="KWD">KWD-Kuwaiti Dinar</option>
                                                <option value="BHD">BHD-Bahraini Dinar</option>
                                                <option value="AED">AED-Emirati Dinar</option>
                                                <option value="QAR">QAR-QATARI Riyal</option>
                                                <option value="GBP">GBP-Great Britain Pound</option>

                                            </select> <br />
                                            <p className="ml-4"> <b>1 USD= </b>{currencies[currency]} {currency}</p>

                                            <input name="amount"
                                                placeholder="Amount"
                                                type="number"
                                                value={amount}
                                                onChange={e => onChangeHandler(e)}
                                                className="border p-3 w-100 my-2" />


                                            <input name="convAmt"
                                                placeholder="In  $USD "
                                                type="number"
                                                value={result}
                                                onChange={e => onChangeHandler(e)}
                                                className="border p-3 w-100 my-2" disabled />
                                            <p className="ml-4"> <b>Converted Amt. In $USD</b></p>

                                            <input name="date"
                                                placeholder="Date"
                                                type="date"
                                                value={date}
                                                onChange={e => onChangeHandler(e)} className="border p-3 w-100 my-2" required />

                                            <div>
                                                <small>Upload Recipt <b>Max-File-Size-1MB <br />Supported File jpg/png</b></small>
                                                <input
                                                    placeholder="Upload Receipt"
                                                    type="file"
                                                    tdata-button="Upload Recipt"
                                                    name="image"
                                                    onChange={onChangeImage} className="border p-3 w-100 my-2" /> <br />

                                            </div>

                                            <button type="submit" className="d-block py-3 px-5 bg-success text-white border-0 rounded font-weight-bold mt-3">Edit</button>

                                        </fieldset>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </form>
            </div>
        </Fragment>
    )
}

EditInvestment.propTypes = {
    editInvestment: PropTypes.func.isRequired,
    getCurrentInvestment: PropTypes.func.isRequired,
    investment: PropTypes.object.isRequired,
    getCurrencies: PropTypes.func.isRequired,
    getProjects: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    investment: state.investment,
    currencies: state.investment.currencies,
    projects: state.project.projects

});
export default connect(mapStateToProps, { editInvestment, getCurrentInvestment, getCurrencies, getProjects })(EditInvestment);
