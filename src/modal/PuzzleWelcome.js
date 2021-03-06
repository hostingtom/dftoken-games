import React, {useCallback, useState} from "react";
import './Page.css'
import firebase from "../firebase";
import {withRouter} from "react-router";


const PuzzleWelcome = ({history}) => {
    const [error, setError] = useState(null);
    const [disable, setDisable] = useState(false)

    const db = firebase.firestore();

    const handleLogin = useCallback(
        async (event) => {
            event.preventDefault();
            setDisable(true);
            const {address} = event.target.elements;
            if(address.value.length < 26) {
                setError("Input Valid Wallet Address!!!");
                setDisable(false);
            }
            else{
                try{
                    const bsc = address.value;
                    await
                        db.collection("users")
                            .doc(address.value)
                            .get()
                            .then((documentSnapshot) => {
                                if(documentSnapshot.exists){
                                    console.log("registered")

                                    const walletInfo = {
                                        balance: documentSnapshot.data().balance +2,
                                        request: false,
                                        walletAddress: bsc,
                                    };
                                    db.collection("users")
                                        .doc(bsc)
                                        .update(walletInfo)
                                        .then(() => {
                                           // console.log("Updated")
                                            history.push("/Puzzle");
                                        })
                                        .catch((err) => {
                                            console.error(err);
                                        });
                                }
                                else{
                                    const walletInfo = {
                                        balance: 10,
                                        withdraw: "",
                                        request: false,
                                        walletAddress: bsc,
                                    };
                                    db.collection("users")
                                        .doc(bsc)
                                        .set(walletInfo)
                                        .then(() => {
                                            //console.log("stored")
                                            history.push("/Puzzle")
                                        })
                                        .catch((err) => {
                                            console.error(err);
                                        });
                                }
                            })

                    console.log(address.value)

                }
                catch (error) {
                    alert({error})
                }
            }
        },
        // eslint-disable-next-line
        [history]
    )
    return (
        <>
            <div className="game-body">
                <div className="Form">
                    <form onSubmit={handleLogin}>
                        {/** Input Form */}
                        <div className="form-group">
                            <p>BSC Wallet Address</p>
                            <input
                                type="text"
                                name="address"
                                className="form-control"
                                placeholder="wallet address"
                                required={true}
                            />
                            <h3 className="error-class">{error ? error : ""}</h3>
                        </div>
                        <div className="form-group">
                            <button type="submit" disabled={disable} className="btn btn-md btn-secondary">
                                Play Game
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    );
}

export default withRouter(PuzzleWelcome);
