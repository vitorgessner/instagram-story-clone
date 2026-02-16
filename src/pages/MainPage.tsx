import { Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../components/ui/dialog"
import { Button } from "../components/ui/dialog"

function MainPage() {
  return (
    <>
      <header className="header">
        <nav>
          <ul className="stories">
            <li>
              <button className="newStory" disabled>
                <Plus size={32} fill="#e5e7eb" />
              </button>
            </li>
            <li>
              <img className="profilePicture" src="..\public\images\tinho.jpg" alt="tinho" />
            </li>
            <li>
              <img className="profilePicture" src="..\public\images\phos.jpg" alt="phos" />
            </li>
            <li>
              <img className="profilePicture" src="..\public\images\vic.png" alt="phos" />
            </li>
          </ul>
        </nav>
      </header>
      <main className="mainPage">
        <p className="mainPageParagraph">Login to add a new story</p>
        <Dialog>
          <DialogTrigger className="underline px-2 hover:bg-indigo-200 rounded-lg">Login</DialogTrigger>
          <DialogContent className="max-w-xs sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>If it's your first time, no worries, it will create an account for you</DialogTitle>
            </DialogHeader>
            <form className="flex flex-col" method="POST" onSubmit={(e) => e.preventDefault()}>
              <div className="inputContainer">
                <label htmlFor="user">User:</label>
                <input type="text" name="user" id="user" />
              </div>
              <div className="inputContainer">
                <label htmlFor="pass">Password:</label>
                <input type="password" name="pass" id="pass" />
              </div>
              <DialogFooter>
              <DialogClose>
                <Button type="button" variant='destructive'>Close</Button>
                <Button type="submit">Login</Button>
              </DialogClose>
              
            </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </>
  )
}

export default MainPage
