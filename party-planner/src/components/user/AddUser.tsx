interface Props {
  inputId: string;
  ftAddUser: () => void;
}

const AddUser = ({inputId, ftAddUser}: Props) => {
  return (
    <div className="input-group mb-3">
      <input id={inputId} type="text" className="form-control"
        placeholder="Username" aria-label="Username" aria-describedby="addUsrText"
        onKeyDown={(e) => {
          if (e.key === 'Enter') ftAddUser();
        }}
      />
      <button type="button" className="btn btn-primary" onClick={ftAddUser}>Add</button>
      <div className="valid-feedback">User added successfully!</div>
      <div className="invalid-feedback">User already exists!</div>
    </div>
  );
};

export default AddUser;