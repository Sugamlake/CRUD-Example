import React, { useState } from "react";
import "./CRUD.css";

function CRUD() {
  const list = [
    {
      id: 1,
      name: "HP",
      price: "2222",
    },
    {
      id: 2,
      name: "Dell",
      price: "3333",
    },
  ];

  const [lists, setList] = useState(list);
  const [updateState, setUpdateState] = useState(-1);

  return (
    <div className="crud">
      <div>
        <addList setList={setList} />
        <form onSubmit={handleSubmit}>
          <table>
            {list.map((current) =>
              updateState === current.id ? (
                <EdiList current={current} list={list} setList={setList} />
              ) : (
                <tr>
                  <td>{current.name}</td>
                  <td>{current.price}</td>
                  <td>
                    <button
                      className="edit"
                      onClick={() => handleEdit(current.id)}
                    >
                      Edit
                    </button>
                    <button className="delete" type="button" onClick={() => handleDelete(current.id)}>Delete</button>
                  </td>
                </tr>
              )
            )}
          </table>
        </form>
      </div>
    </div>
  );
}

function handleEdit(id) {
  setUpdateState(id);
}

function handleDelete(id) {
  const newlist = list.filter((li) => li.id !== id)
  setList(newlist)
}

function handleSubmit(event) {
  event.preventDefault();
  const name = event.target.elements.name.value;
  const price = event.target.elements.price.value;
  const newlist = list.map((li) =>
    li.id === updateState ? { ...li, name: name, price: price } : li
  );

  setList(newlist);
  setUpdateState(-1);
}

function EdiList({ current, list, setList }) {
  function handImputName(event) {
    const value = event.target.value;
    const newlist = list.map((li) =>
      li.id === current.id ? { ...li, name: value } : li
    );

    setList(newlist);
  }
  function EdiList({ current, list, setList }) {
    function handImputPrice(event) {
      const value = event.target.value;
      const newlist = list.map((li) =>
        li.id === current.id ? { ...li, price: value } : li
      );
  
      setList(newlist);
    }
  return (
    <tr>
      <td>
        <input
          type="text"
          onChange={handImputName}
          name="name"
          value={current.name}
        />
      </td>
      <td>
         <input
          type="text"
          onChange={handImputPrice}
          name="name"
          value={current.name} />
      </td>
      <td>
        <button type="submit">Update</button>
      </td>
    </tr>
  );
}

function addList(setList) {
  const nameRef = React.createRef();
  const priceRef = React.createRef();
  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const price = event.target.elements.price.value;
    const newList = {
      id: 3,
      name: name,
      price: price,
    };
    setList((prevList) => {
      return prevList.concat(newList);
    });

    nameRef.current.value = "";
    priceRef.current.value = "";
  }
  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Enter Name" ref={nameRef} />
      <input
        type="text"
        name="price"
        placeholder="Enter Price"
        ref={priceRef}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default CRUD; 
