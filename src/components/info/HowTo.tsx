const HowTo = () => {
  return (
    <div className="col-12" style={{ color: 'white' }}>
      <h2>How To</h2>
      <ul>
        <li>
          Add a new item [name]
          <ul>
            <li>Type a name in the input text below and press enter</li>
          </ul>
        </li>
        <li>
          Update an existing item
          <ol>
            <li>Hover up a card. </li>
            <li>Click on top of the name of the card</li>
            <li>The card will flip</li>
            <ul>
              <li>Click in the X button to cancel</li>
              <li>Type a new name for the card and press [Enter]</li>
            </ul>
          </ol>
        </li>
        <li>
          Picking a winner
          <ol>
            <li>Click in the Random Winner button</li>
            <li>Click reset and choose another winner</li>
          </ol>
        </li>
        <li>
          Remove an item
          <ol>
            <li>
              Click in the trash icon (
              <span
                className="glyphicon glyphicon-trash"
                aria-hidden="true"
                style={{ color: 'red' }}
              ></span>
              ) on upper right corner
            </li>
          </ol>
        </li>
      </ul>
    </div>
  );
};

export default HowTo;
