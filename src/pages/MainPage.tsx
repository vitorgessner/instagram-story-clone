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
import { Stories } from "../components/Stories"
import Form from "../components/Form/Form"

function MainPage() {
  const isLoggedIn = true;
  const file = null;
  return (
    <>
      <header className="header">
        <nav>
          <Stories>
            <li className="flex flex-col items-center -order-999">
              <Dialog>
                <DialogTrigger className="underline hover:bg-linear-120 from-indigo-200 to-indigo-300 rounded-full size-16 flex justify-center">
                  <button className="newStory" disabled={!isLoggedIn}>
                    <Plus size={32} fill="#e5e7eb" />
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-xs sm:max-w-sm min-h-100 min-w-150 flex flex-col">
                  <DialogHeader>
                    <DialogTitle>Post an image</DialogTitle>
                  </DialogHeader>
                  <Form>
                    <Form.File />
                    <DialogFooter>
                      <DialogClose>
                        <div className="flex justify-end gap-2 mt-2">
                          <Button type="button" variant='destructive'>Cancel</Button>
                          <Button type="submit" className="disabled:bg-zinc-300 disabled:cursor-none disabled:pointer-events-none" variant='outline' disabled={!file}>Post</Button>
                        </div>
                      </DialogClose>
                    </DialogFooter>
                  </Form>
                </DialogContent>
              </Dialog>
              <h1>New</h1>
            </li>
          </Stories>
        </nav>
      </header>
      <main className="mainPage">
        {!isLoggedIn && <div><p className="mainPageParagraph">Login to add a new story</p>
          <Dialog>
            <DialogTrigger className="underline px-2 hover:bg-indigo-200 rounded-lg">Login</DialogTrigger>
            <DialogContent className="max-w-xs sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>If it's your first time, no worries, it will create an account for you</DialogTitle>
              </DialogHeader>
              <Form>
                <Form.Label>
                  Name: <Form.Text />
                </Form.Label>
                <Form.Label>
                  Password: <Form.Password />
                </Form.Label>
                <DialogFooter>
                  <DialogClose>
                    <div className="flex justify-end gap-2 mt-2">
                      <Button type="button" variant='destructive'>Close</Button>
                      <Button type="submit" variant='outline'>Login</Button>
                    </div>
                  </DialogClose>
                </DialogFooter>
              </Form>
            </DialogContent>
          </Dialog>
        </div>}
        {isLoggedIn && <div>
          <Button type='button' className="font-bold text-lg" variant='outline'>Logoff</Button>
        </div>
        }
      </main>
    </>
  )
}

export default MainPage
