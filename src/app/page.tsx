import Form from './Form';
import { getData } from './action';

export default async function Home() {
  const data = await getData();
  return (
    <main className="flex min-h-screen flex-col space-y-3 divide-y items-center justify-start p-24">
      <div>
        <Form />
      </div>
      <div>
        <table className="w-[800px]">
          <thead>
            <tr>
              <th>name</th>
              <th>email</th>
              <th>country</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((val) => (
              <tr className="text-center" key={val.id}>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>{val.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
