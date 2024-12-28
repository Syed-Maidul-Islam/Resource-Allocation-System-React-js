
// src/components/ResourceTable.js
import React, { useEffect, useState } from 'react';
import './ResourceTable.css'; // Import the CSS file

const ResourceTable = () => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from the API when the component mounts
    useEffect(() => {
        fetch('http://localhost:8045/api/resources')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setResources(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="table-container">
            <h2>Resource List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Experience</th>
                        <th>Skills</th>
                    </tr>
                </thead>
                <tbody>
                    {resources.map(resource => (
                        <tr key={resource.id}>
                            <td>{resource.id}</td>
                            <td>{resource.name}</td>
                            <td>{resource.value}</td>
                            <td>{resource.skills}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResourceTable;