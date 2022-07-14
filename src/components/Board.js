import { Container, Col, Row } from "react-bootstrap";
import NumberBox from "./NumberBox";
import TotalsBox from "./TotalsBox";
import PenaltyBox from "./PenaltyBox";
import LockBox from "./LockBox";

import { useSelector, useDispatch } from "react-redux";
import { toggleBoxValue, resetBoard } from "../utils/scoreSlice";

const Board = () => {
    const score = useSelector((state) => state.score);
    const {row1, row2, row3, row4, penalties} = score;
    const dispatch = useDispatch();

    const scoreRow = (rowArray) => { //function takes the array for a given row (such as "row1")
        let score = 0;
        let numberofmarks = rowArray.reduce((prev, current) => prev + current);  //reducer supplies us with the total of "marks" (boxes that have a value of 1)
        while (numberofmarks > 0) {  //for however many have a "1", we add the total number of marks to the score for this row
            score += numberofmarks;
            numberofmarks--;
        };
        return score  // returning the final score
    }

    return (
    <Container className="light-gray-bg">
        <Row className="main-red p-2">
            {row1.map((current, index) => {
                    return <Col>
                        <div onClick = {() => dispatch(toggleBoxValue({rowSpot: 'row1', numberIndex: index}))} className='main-red-text'>
                            <NumberBox value={current} display={`${index+2}`} />
                        </div>
                    </Col>
                } 
            )}
            <Col>
                <div className='main-red-text' >
                    <LockBox value={row1[10]} />
                </div>
            </Col>
        </Row>

      <Row className="main-yellow p-2">
        {row2.map((current, index) => {
                    return <Col>
                        <div onClick = {() => dispatch(toggleBoxValue({rowSpot: 'row2', numberIndex: index}))} className='main-yellow-text'>
                            <NumberBox value={current} display={`${index+2}`} />
                        </div>
                    </Col>
                }
            )}
            <Col>
                <div className='main-yellow-text' >
                    <LockBox value={row2[10]}/>
                </div>
            </Col>
        </Row>

        <Row className="main-green p-2">
        {row3.map((current, index) => {
                    return <Col>
                        <div onClick = {() => dispatch(toggleBoxValue({rowSpot: 'row3', numberIndex: index}))} className='main-green-text'>
                            <NumberBox value={current} display={`${index+2}`} />
                        </div>
                    </Col>
                }
            )}
            <Col>
                <div className='main-green-text' >
                    <LockBox value={row3[10]}/>
                </div>
            </Col>
        </Row>

        <Row className="main-blue p-2">
            {row4.map((current, index) => {
                    return <Col>
                        <div onClick = {() => dispatch(toggleBoxValue({rowSpot: 'row4', numberIndex: index}))} className='main-blue-text'>
                            <NumberBox value={current} display={`${index+2}`} />
                        </div>
                    </Col>
                    }
                )
            }
            <Col>
                <div className='main-blue-text' >
                    <LockBox value={row4[10]}/>
                </div>
            </Col>
        </Row>

        <Row>
            <Col>Penalties</Col>
            <Col>
                <div onClick={() => dispatch(toggleBoxValue({rowSpot: 'penalties', numberIndex: 0}))}>
                    <PenaltyBox value={penalties[0]}/>
                </div>
            </Col>
            <Col>
                <div onClick={() => dispatch(toggleBoxValue({rowSpot: 'penalties', numberIndex: 1}))}>
                    <PenaltyBox value={penalties[1]}/>
                </div>
            </Col>
            <Col>
                <div onClick={() => dispatch(toggleBoxValue({rowSpot: 'penalties', numberIndex: 2}))}>
                    <PenaltyBox value={penalties[2]}/>
                </div>
            </Col>
            <Col>
                <div onClick={() => dispatch(toggleBoxValue({rowSpot: 'penalties', numberIndex: 3}))}>
                    <PenaltyBox value={penalties[3]}/>
                </div>
            </Col>
        </Row>

      <Row>
        <Col>
            Row 1:<TotalsBox value={scoreRow(row1)} />
        </Col>
        <Col>
            Row 2:<TotalsBox value={scoreRow(row2)} />
        </Col>
        <Col>
            Row 3:<TotalsBox value={scoreRow(row3)} />
        </Col>
        <Col>
            Row 4:<TotalsBox value={scoreRow(row4)} />
        </Col>
        <Col>Total: <TotalsBox value={scoreRow(row1) + scoreRow(row2) + scoreRow(row3) + scoreRow(row4) - (5*(penalties[0] + penalties[1] + penalties[2] + penalties[3]))}/></Col>
      </Row>

      <Row className="dark-gray-bg">
        <button onClick={() => dispatch(resetBoard())}>Reset Board</button>
      </Row>
    </Container>
  );
};

export default Board;
