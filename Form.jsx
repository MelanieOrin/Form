import React, { useState } from 'react';
import './Form.css';


const Form = () => {

    const [name, setName] = useState({ first: "", last: "", full: "" });

    const [withdrawalType, setWithdrawalType] = useState("");

    const [isPaymentWithdrawalSelected, setIsPaymentWithdrawalSelected] = useState(false);

    const [SSN, setSSN] = useState("");

    const [fund, setFund] = useState({ name: "", account: "", number: "" });

    const [withdrawal, setWithdrawal] = useState("");

    const [submissionError, setSubmissionError] = useState({ nameError: false, ssnError: false, fundNameError: false, numberError: false, withdrawalError: false, submitted: false });

    const handleNameChange = (event) => {
        if (event.target.name === "first" || event.target.name === "last") {
            let fullName = "";
            if (event.target.name === "first") {
                fullName = event.target.value + " " + name.last
            }
            if (event.target.name === "last") {
                fullName = name.first + " " + event.target.value;
            }
            setName({ ...name, [event.target.name]: event.target.value, full: fullName })

        }
        else {
            const firstName = event.target.value.split(" ")[0];
            const lastName = event.target.value.split(" ")[1];
            setName({ first: firstName, last: lastName, full: event.target.value })
        }
    }


    const handleWithdrawalType = (e) => {
        setWithdrawalType(e.target.value);
    }

    const handlePaymentWithdrawalSelection = (e) => {
        const isSelected = e.target.value === "true" ? true : false;
        setIsPaymentWithdrawalSelected(!isSelected);
    }

    const handleSSN = (e) => {
        setSSN(e.target.value);
    }

    const handleFund = (e) => {
        setFund({ ...fund, [e.target.name]: e.target.value });
    }

    const handleWithdrawal = (e) => {
        if (!isNaN(e.target.value))
            setWithdrawal(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errors = { ...submissionError };
        let isSubmissionError = false;
        if (!(/^[a-zA-Z\s]*$/).test((name.full))) {
            errors.nameError = true;
            isSubmissionError = true;
        }
        if ((/^[a-zA-Z\s]*$/).test((name.full))) {
            errors.nameError = false;
        }
        if (!(/^[0-9]{3}\-?[0-9]{2}\-?[0-9]{4}$/.test(SSN))) {
            errors.ssnError = true;
            isSubmissionError = true;
        }
        if ((/^[0-9]{3}\-?[0-9]{2}\-?[0-9]{4}$/.test(SSN))) {
            errors.ssnError = false;
        }
        if (!(/^[a-zA-Z0-9\s]*$/).test((fund.name))) {
            errors.fundNameError = true;
            isSubmissionError = true;
        }
        if ((/^[a-zA-Z0-9\s]*$/).test((fund.name))) {
            errors.fundNameError = false;
        }
        if (!(/^[0-9]+$/).test((fund.account)) || !(/^[0-9]+$/).test((fund.number))) {
            errors.numberError = true;
            isSubmissionError = true;
        }
        if ((/^[0-9]+$/).test((fund.account)) || !(/^[0-9]+$/).test((fund.number))) {
            errors.numberError = false;
        }
        if (withdrawal >= 99000) {
            errors.withdrawalError = true;
            isSubmissionError = true;
        }
        if (!withdrawal < 99000) {
            errors.withdrawalError = false;
        }
        errors.submitted = isSubmissionError;
        setSubmissionError(errors);
    }

    return (
        <div className="Form">
            <form style={{ marginBottom: "20px" }}>
                <div className="marginBottom10" style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <label style={{ width: "45%" }}>First Name
                        <input style={{ width: "100%" }} type="text" name="first" value={name.first} onChange={handleNameChange}></input>
                    </label>
                    <label style={{ width: "45%" }}>Last Name
                        <input style={{ width: "100%" }} type="text" name="last" value={name.last} onChange={handleNameChange}></input>
                    </label>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label className="marginBottom10">Full Name</label>
                    <input className="marginBottom10" type="text" name="full" value={name.full} onChange={handleNameChange}></input>
                    <label className="marginBottom10">Social Security Number</label>
                    <input className="marginBottom10" type="text" value={SSN} onChange={handleSSN}></input>
                    <label className="marginBottom10">Mobile Phone Number</label>
                    <input className="marginBottom10" type="text"></input>
                    <label className="marginBottom10">Email</label>
                    <input className="marginBottom10" type="text"></input>
                    <div className="bold">Type of form to send:</div>
                    <div><input type="radio"></input>
                        <label>Fund withdrawal request</label></div>
                    <div><input type="radio"></input>
                        <label>Fund transfer cancel request</label></div>
                    <div className="marginBottom10"><input type="radio"></input>
                        <label>Life insurance onboarding form</label></div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label className="marginBottom10">Fund Name</label>
                        <input className="marginBottom10" type="text" name="name" value={fund.name} onChange={handleFund}></input>
                        <label className="marginBottom10">Account Number</label>
                        <input className="marginBottom10" type="text" name="account" value={fund.account} onChange={handleFund}></input>
                        <label className="marginBottom10">Fund Number</label>
                        <input className="marginBottom10" type="text" name="number" value={fund.number} onChange={handleFund}></input>
                    </div>
                </div>
                <div className="bold marginBottom10">Employment Type</div>
                <div className="marginBottom10">
                    <input type="radio"></input>
                    <label>Employee</label>
                </div>
                <div className="marginBottom10" >
                    <input type="radio"></input>
                    <label>Independent</label>
                </div>
                <div className="bold marginBottom10">Withdrawal Type</div>
                <div className="marginBottom10">
                    <input type="radio" name="withdrawal" checked={withdrawalType === "full"} value="full" onChange={handleWithdrawalType} />
                    <label>Full withdrawal</label>
                </div>
                {withdrawalType === "auto" && <><div className="marginBottom10">
                    <input type="radio" name="withdrawal" checked={withdrawalType === "partial"} value="partial" onChange={handleWithdrawalType} />
                    <label>Partial withdrawal</label>
                </div></>}
                <div className="marginBottom10">
                    <input type="radio" name="withdrawal" checked={withdrawalType === "auto"} value="auto" onChange={handleWithdrawalType} />
                    <label>Automated monthly withdrawal</label>
                </div>
                {withdrawalType === "auto" && <><div className="marginBottom10" style={{ marginLeft: "20px" }}>
                    <input type="checkbox" value={isPaymentWithdrawalSelected} checked={isPaymentWithdrawalSelected === true} onClick={handlePaymentWithdrawalSelection}></input>
                    <label>Payment withdrawal</label>
                </div>
                    {isPaymentWithdrawalSelected === true && <> <div className="marginBottom10" style={{ marginLeft: "40px" }}>
                        <input type="checkbox"></input>
                        <label>Eligible for Tax Refund</label>
                    </div>
                        <div className="marginBottom10" style={{ marginLeft: "40px" }}>
                            <input type="checkbox"></input>
                            <label>Not Eligible for Tax Refund</label>
                        </div>
                    </>}
                </>
                }
                <div style={{ marginLeft: "20px", marginBottom: "40px" }}>
                    <input type="checkbox"></input>
                    <label>Corresponding to a loan</label>
                </div>
                {withdrawalType === "partial" && <><label className="marginBottom10">Withdrawal Amount</label>
                    <input className="marginBottom10" value={withdrawal} onChange={handleWithdrawal} type="text"></input></>}
                <div style={{ textAlign: "center" }}>
                    <button className="clearButton">Clear Form</button>
                </div>
                <button className="sendButton" onClick={handleSubmit}>Send Form</button>
                {submissionError.nameError === true && <div className="marginBottom10">*First and last names can only contain english letters and whitespaces</div>}
                {submissionError.ssnError === true && <div className="marginBottom10">*Social security number must only be digits in this format: DDD-DD-DDDD</div>}
                {submissionError.fundNameError === true && <div className="marginBottom10">*Fund name can only consist of english letters, numbers, and whitespaces</div>}
                {submissionError.numberError === true && <div className="marginBottom10">*Account number and fund number can only be digits</div>}
                {submissionError.withdrawalError === true && <div className="marginBottom10">*Withdrawal must be under 99000</div>}
                {submissionError.submitted === true && <div className="marginBottom10">*Your form was sent succesfully</div>}
            </form>
        </div>
    );
}

export default Form;