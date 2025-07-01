import React, { useState, useEffect } from "react";
import { Button, Card, Table, Container, Row, Col } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";

const Collegestate = () => {
  const [currentStateName, setCurrentStateName] = useState('');
  const [stateName, setStateName] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [states, setStates] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = () => {
    axios.get('http://localhost:1010/U1/StateReg')
      .then(response => {
        setStates(response.data.state);
      })
      .catch(error => {
        console.error('There was an error fetching the state data!', error);
      });
  };

  const handleAddState = (e) => {
    e.preventDefault();

    if (!stateName) {
      alert('Please fill out all fields');
      return;
    }

    const newState = {
      State_Name: stateName,
      Status: isActive ? 'Active' : 'Inactive'
    };

    axios.post('http://localhost:1010/U1/statepost', newState)
      .then(response => {
        if (response.data && response.data.state) {
          setStates([...states, response.data.state]);
        } else {
          console.error('Invalid response structure:', response.data);
        }
        setStateName('');
        setIsActive(true);
      })
      .catch(error => {
        console.error('There was an error adding the state!', error);
      });
  };

  const handleDeleteState = (stateName) => {
    if (window.confirm(`Are you sure you want to delete the state ${stateName}?`)) {
      axios.delete(`http://localhost:1010/U1/stateDel/${stateName}`)
        .then(response => {
          console.log(response.data);
          setStates(states.filter(state => state.State_Name !== stateName));
        })
        .catch(error => {
          console.error('There was an error deleting the State!', error);
        });
    }
  };

  const handleEditState = (state) => {
    setEditMode(true);
    setCurrentStateName(state.State_Name);
    setStateName(state.State_Name);
    setIsActive(state.Status === 'Active');
  };

  const handleUpdateState = () => {
    if (window.confirm(`Are you sure you want to update this state?`)) {

      const updatedState = {
        State_Name: stateName,
        Status: isActive ? 'Active' : 'Inactive'
      };

      axios.put(`http://localhost:1010/U1/Statepdate/${currentStateName}`, updatedState)
        .then(response => {
          const updatedStates = states.map(state => {
            if (state.State_Name === currentStateName) {
              return { ...state, State_Name: stateName, Status: updatedState.Status };
            }
            return state;
          });
          setStates(updatedStates);
          setEditMode(false);
          setCurrentStateName('');
          setStateName('');
          setIsActive(true);
        })
        .catch(error => {
          console.error('There was an error editing the state!', error);
        });
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4" style={{ color: 'rgb(33, 37, 41)', fontWeight: "bold" }}>STATE</Card.Title>
              <p className="card-category" style={{ color: 'blue', fontSize: '13px' }}>State Information</p>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th className="border-0"style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color:"black"}}>State</th>
                    <th className="border-0" style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color:"black"}}>Status</th>
                    <th className="border-0" style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color:"black"}}>Action</th> 
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><input type="text" value={stateName} onChange={(e) => setStateName(e.target.value)} /></td>
                    <td>
                      <label>
                        Active / Inactive:
                        <input type="checkbox" checked={isActive} onChange={() => setIsActive(!isActive)} />
                      </label>
                    </td>
                    <td>
                      {editMode ? (
                        <Button variant="secondary" style={{ backgroundColor: "#212529", color: "white", border: "none" , width:"120px" }} onClick={handleUpdateState}>Update</Button>
                      ) : (
                        <Button variant="secondary" style={{ backgroundColor: "#212529", color: "white", border: "none" , width:"120px" }} onClick={handleAddState}>Add State</Button>
                      )}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4"style={{ color: 'rgb(33, 37, 41)', fontWeight: "bold" }}>STATE</Card.Title>
              <p className="card-category" style={{ color: 'blue', fontSize: '13px' }}>User State</p>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <td style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color: "black", textAlign: "center" }}>Sr NO.</td>
                    <td style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color: "black", textAlign: "center" }}>State</td>
                    <td style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color: "black", textAlign: "center" }}>Status</td>
                    <td style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color: "black", textAlign: "center" }}>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {states.map((state, index) => (
                    <tr key={index}>
                      <td className="text-center align-middle" style={{ color: "#909090" }}>{index + 1}</td>
                      <td className="text-center align-middle" style={{ color: "#909090" }}>{state.State_Name}</td>
                      <td className="text-center align-middle" style={{ color: "#909090" }}>{state.Status}</td>
                      <td className="d-flex justify-content-center align-items-center gap-3" style={{ height: "50px" }}>
                      <MdEdit
                          onClick={() => handleEditState(state)}
                          style={{ cursor: 'pointer', color: 'blue' }}
                        />
                        <MdDelete
                          onClick={() => handleDeleteState(state.State_Name)}
                          style={{ cursor: 'pointer', color: 'red' }}
                        />
                      
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Collegestate;
