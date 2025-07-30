import React from 'react';

const StudentCard = ({ student, color }) => {
    return (
        <div className={`rounded-xl shadow-md p-4 m-4 w-64 ${color}`}>
            <h3 className="text-lg font-semibold text-blue-800">{student.name}</h3>
            <p className="font-bold text-gray-800">
                Roll No: <span className="font-normal text-gray-700">{student.rollNo}</span>
            </p>
            <p className="font-bold text-gray-800">
                Class: <span className="font-normal text-gray-700">{student.department}</span>
            </p>
        </div>
    );
};

export default StudentCard;
