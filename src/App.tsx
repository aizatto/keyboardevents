import React, {useEffect, useState} from 'react';

interface KE {
  id: number,
  key: string,
  code: string,
  keyCode: number,
  ctrlKey: boolean,
  shiftKey: boolean,
  metaKey: boolean,
  altKey: boolean,
}

const App: React.FC = () => {
  const [keycodes, setKeycodes] = useState<KE[]>([]);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      console.log(e);
      const newKeycodes = keycodes.concat([
        {
          id: new Date().getTime(),
          key: e.key,
          code: e.code,
          keyCode: e.keyCode,
          ctrlKey: e.ctrlKey,
          shiftKey: e.shiftKey,
          metaKey: e.metaKey,
          altKey: e.altKey,
        }
      ]);
      setKeycodes(newKeycodes);
    };

    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  });

  const lis = Array.from(keycodes).reverse().map((e, index) => {
    const className = index === 0
      ? 'border border-success'
      : '';

    const {id, ...args} = e;
    return (
      <tr key={e.id} className={className}>
        <td>{args.key}</td>
        <td>{args.code}</td>
        <td>{args.keyCode}</td>
        <td>{args.ctrlKey ? 'true' : ''}</td>
        <td>{args.shiftKey ? 'true' : ''}</td>
        <td>{args.metaKey ? 'true' : ''}</td>
        <td>{args.altKey ? 'true' : ''}</td>
      </tr>
    );
  });

  return (
    <div className="App container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>key</th>
            <th>code</th>
            <th>keyCode</th>
            <th>ctrlKey</th>
            <th>shiftKey</th>
            <th>metaKey</th>
            <th>altKey</th>
          </tr>
        </thead>
        <tbody>
          {lis}
        </tbody>
      </table>
    </div>
  );
}

export default App;
