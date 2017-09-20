// import React, {Component} from 'react';
// import { Link } from 'react-router-dom';
// import Subject from './Subject';


// class Subjects extends Component {
//     constructor(){
//       super();
//       this.state = {
//         subjects: subjects
//       }
//     }
  
//     renderSubjects(array){
//       return array.map(subject => {
//         return (
//           <li key={subject.id} className='individual-subject'>
//             <Link to={`/subjects/${subject.id}`}>{subject.name} </Link>
//           </li>
//         )
//       })
//     }
  
//     render(){
//       return(
//         <div className='subjects'>
//           <ul className='list-of-subjects'>
//             {this.renderSubjects(this.state.subjects)}
//           </ul>
//         </div>
//       )
//     }
//   }
  
//   export default Subjects;
  