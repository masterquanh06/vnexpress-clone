'use client'
import Link from 'next/link';
import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import CreateModal from './CreateModal';
import UpdateModal from './UpdateModal';
interface IProps {
  blogs: IBlog[]
}
function AppTable(props: IProps) {
  const { blogs = [] } = props;
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  console.log("check props", blogs)
  const handleDelete = (id: number) => {
    if (confirm(`Bạn có muốn xóa không blog có id là ${id}`)) {
      fetch(`http://localhost:8000/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json , text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(res => {
          if (res) {
            toast.success("Delete a Blog successfully");
            mutate('http://localhost:8000/blogs')
          }
        });
    }
  }
  return (

    <div>
      <div className='mb-3'
        style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Blog List</h3>
        <Button variant="secondary" onClick={() => setShowModalCreate(true)}>Add News</Button>

      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>
                  <Button variant="success">
                    <Link href={`/politics/${item.id}`} className='text-decoration-none text-white'>
                      View
                    </Link>
                  </Button>
                  <Button variant="warning" className='mx-3' onClick={() => {
                    setBlog(item);
                    setShowModalUpdate(true)
                  }}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(item.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            )
          })}


        </tbody>
      </Table>
      <CreateModal
        showModalCreate={showModalCreate}
        setShowModalCreate={setShowModalCreate}
      />
      <UpdateModal
        showModalUpdate={showModalUpdate}
        setShowModalUpdate={setShowModalUpdate}
        blog={blog}
        setBlog={setBlog}
      />
    </div>
  )
}

export default AppTable