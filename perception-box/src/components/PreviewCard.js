
export default function Previewstyles({ data, close }) {
  return (
    <div>
      <button onClick={close}>CLOSE</button>
    <ul>
        <li>Name: {data.name}</li>
        <li>Species: {data.species}</li>
        <li>Gender: {data.gender}</li>
        <li>Location: {data.location.name}</li>
        <li>Status: {data.status}</li>
        <li>Created: {data.created}</li>
        <li>Episode:
            <ol>
                {data.episode.map(item=><li>{item}</li>)}
            </ol>
        </li>
    </ul>

    
    </div>
  );
}
