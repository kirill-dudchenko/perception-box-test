
export default function Previewstyles({ data, close }) {
  return (
    <div>
      <button onClick={close}>CLOSE</button>
    <ul>
        <li>{data.name}</li>
        <li>{data.species}</li>
        <li>{data.gender}</li>
        <li>{data.location.name}</li>
        <li>{data.status}</li>
        <li>{data.created}</li>
        <li>Episode:
            <ol>
                {data.episode.map(item=><li>{item}</li>)}
            </ol>
        </li>
    </ul>

    
    </div>
  );
}
