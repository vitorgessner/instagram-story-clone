import { Play, ArrowLeftCircle, ArrowRightCircle, ArrowBigLeft } from "lucide-react"
import { Link } from "react-router"

export const StoriesPage = () => {
    return (
        <main className="storiesView">
            {/* <article className="miniStoriesList">
                <section className="story">
                    <div className="inside text-center text-white">
                        <img className="profilePicture mx-auto" src="../public/images/tinho.jpg" alt="" />
                        <h1>user name</h1>
                        <p>0s</p>
                    </div>
                    <img className="storyImage brightness-75" src="../public/images/new planet, restart of all.png" alt="" />
                </section>
            </article> */}

            <article className="miniStoriesList">
                <section className="story">
                    <div className="inside text-center text-white">
                        <img className="profilePicture mx-auto" src="../public/images/tinho.jpg" alt="" />
                        <h1>user name</h1>
                        <p>0s</p>
                    </div>
                    <img className="storyImage brightness-75" src="../public/images/new planet, restart of all.png" alt="" />
                </section>
            </article>

            <button className=""><ArrowLeftCircle size='24' stroke="#222" /></button>
            <article className="storiesList">
                <section className="progress">
                    <div className="progressTick"></div>
                    <div className="progressTick"></div>
                    <div className="progressTick"></div>
                </section>
                <section className="profile">
                    <div className="flex gap-2 items-center">
                        <img className="profilePictureMini" src="../public/images/tinho.jpg" alt="" />
                        <h1>User name</h1>
                        <p>0s</p>
                    </div>
                    <button className="flex gap-2">
                        <Play size={16} fill="#000" />
                    </button>
                </section>
                <section className="story">
                    <img className="storyImage" src="../public/images/new planet, restart of all.png" alt="" />
                </section>
            </article>
            <button className=""><ArrowRightCircle size='24' stroke="#222" /></button>

            <article className="miniStoriesList">
                <section className="story">
                    <div className="inside text-center text-white">
                        <img className="profilePicture mx-auto" src="../public/images/tinho.jpg" alt="" />
                        <h1>user name</h1>
                        <p>0s</p>
                    </div>
                    <img className="storyImage brightness-75" src="../public/images/new planet, restart of all.png" alt="" />
                </section>
            </article>

            {/* <article className="miniStoriesList">
                <section className="story">
                    <div className="inside text-center text-white">
                        <img className="profilePicture mx-auto" src="../public/images/tinho.jpg" alt="" />
                        <h1>user name</h1>
                        <p>0s</p>
                    </div>
                    <img className="storyImage brightness-75" src="../public/images/new planet, restart of all.png" alt="" />
                </section>
            </article> */}

            <Link className="absolute left-4 top-4" to={'/'}><ArrowBigLeft size={24} fill="#222" stroke="#222"/></Link>
        </main>
    )
}