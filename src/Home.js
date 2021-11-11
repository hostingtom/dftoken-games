import React, {useState} from "react";
import './styles/Home.css'
import Magic from "./image/magic-touch-logo.png";
import PuzzleLogo from "./image/puzzle-game-logo.jpg";
import Logo from "./image/Shared-Image.png";
import Welcome from "./modal/Welcome";
import Modal from "./modal/Modal";
import PuzzleModal from "./modal/PuzzleModal";
import PuzzleWelcome from "./modal/PuzzleWelcome";

const Home = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [isPuzzle, setIsPuzzle] = useState(false);

    return (
        <>
            <Modal open={isLogin} onClose={() => setIsLogin(false)}>
                <Welcome />
            </Modal>
            <PuzzleModal open={isPuzzle} onClose={() => setIsPuzzle(false)}>
                <PuzzleWelcome />
            </PuzzleModal>
            <div className="home-body">
            <div className="main-bg">
                <div className="header">
                    <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
                        <a className="navbar-brand" href="https://dftoken.net">
                            <img src={Logo}
                                 alt=""
                                 className="img-fluid" />
                            Dragon Finance
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#collapsibleNavId"
                                aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span></button>
                        <div className="collapse navbar-collapse" id="collapsibleNavId">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">

                                <li className="nav-item">
                                    <a className="nav-link" href="https://presale.dftoken.net/">Pre-sale</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="https://">Change Wallet Address</a>
                                </li>

                            </ul>
                        </div>
                    </nav>
                </div>


                <div className="welcome">
                    <div className="welcome-text">
                        <h3>Welcome <span className="colored">gamers</span></h3>
                        <h4>to the</h4>
                        <h3><span className="colored">Dragon</span> Cave</h3>
                        <a href="https://t.me/dragonfinnaceToken" className="btn btn-md btn-primary"> Join Community</a>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-10 col-md-12">
                        <div className="game-box">

                            <div className="row">
                                <div className="col-lg-3 col-md-4 col-6">
                                    <div className="card">
                                        <div className="card-img-top">
                                            <img src={Magic} alt="" className="img-fluid" />
                                        </div>
                                        <div className="card-body">
                                            <p className="name">Name: <span className="light"> Magic Match</span></p>
                                            <p className="sub-name">Date Created: <span
                                                className="light">09-11-2021</span></p>
                                            <button
                                                onClick={() => setIsLogin(true)}
                                                className="btn btn-md btn-primary">
                                                Play Game</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-md-4 col-6">
                                    <div className="card">
                                        <div className="card-img-top">
                                            <img src={PuzzleLogo} alt="" className="img-fluid" />
                                        </div>
                                        <div className="card-body">
                                            <p className="name">Name: <span className="light"> Puzzle</span></p>
                                            <p className="sub-name">Date Created: <span
                                                className="light">10-11-2021</span></p>
                                            <button
                                                onClick={() => setIsPuzzle(true)}
                                                className="btn btn-md btn-primary">
                                                Play Game</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>

    );
}

export default Home;
