
import ReactDOM from 'react-dom'
import App from './App';
import { CategoriesProvider } from './context/categories_context';
import { CoursesProvider } from './context/courses_context';
import { UsersProvider } from './context/users_context';


ReactDOM.render(<CoursesProvider>
                    <CategoriesProvider>
                        <UsersProvider>
                            <App/>
                        </UsersProvider>
                    </CategoriesProvider>
                </CoursesProvider>, 
document.getElementById('root'));

