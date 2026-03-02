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
import { NavStories } from "../components/NavStories"
import Form from "../components/Form/Form"
import { useState } from "react"
import useProfileStore from "../store/profileStore"
import useStoriesStore from "../store/storiesStore"

function MainPage() {
  const { formData: profilesData, 
    clearForm : clearProfilesForm, 
    loggedProfile, 
    logoff 
  } = useProfileStore();
  const { formData: storiesData, 
    clearForm : clearStoriesForm 
  } = useStoriesStore();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAddStoryOpen, setIsAddStoryOpen] = useState(false);

  const handleLoginOpenChange = (isOpen: boolean) => {
    setIsLoginOpen(isOpen)

    if (!isOpen) {
      clearProfilesForm()
    }
  }

  const handleRegisterOpenChange = (isOpen: boolean) => {
    setIsRegisterOpen(isOpen)

    if (!isOpen) {
      clearProfilesForm()
    }
  }

  const handleAddStoryOpenChange = (isOpen: boolean) => {
    setIsAddStoryOpen(isOpen)

    if (!isOpen) {
      clearStoriesForm()
    }
  }

  return (
    <>
      <header className="header">
        <nav>
          <NavStories>
            <li className="flex flex-col items-center -order-999">
              <Dialog open={isAddStoryOpen} onOpenChange={handleAddStoryOpenChange}>
                <DialogTrigger className="trigger newStory" disabled={!loggedProfile}>
                  <Plus size={32} fill="#e5e7eb" />
                </DialogTrigger>
                <DialogContent className="max-w-sm sm:max-w-sm min-h-100 flex sm:min-w-150 flex-col">
                  <DialogHeader>
                    <DialogTitle>Post an image</DialogTitle>
                  </DialogHeader>
                  <Form id="post" setModal={setIsAddStoryOpen}>
                    <Form.File id="storyImage" />
                    <DialogFooter>
                      <div className="flex justify-end gap-2 mt-2">
                        <DialogClose asChild>
                          <Button type="button" variant='destructive'>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="disabled:bg-zinc-300 disabled:cursor-none disabled:pointer-events-none" variant='outline' disabled={!storiesData.storyImage}>Post</Button>
                      </div>
                    </DialogFooter>
                  </Form>
                </DialogContent>
              </Dialog>
              <h1>New</h1>
            </li>
          </NavStories>
        </nav>
      </header >
      <main className="mainPage">
        {!loggedProfile && <div><p className="mainPageParagraph">Login to add a new story</p>
          <Dialog open={isLoginOpen} onOpenChange={handleLoginOpenChange}>
            <DialogTrigger className="underline px-2 hover:bg-indigo-200 rounded-lg">Login</DialogTrigger>
            <DialogContent className="max-w-xs sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Login to your account</DialogTitle>
              </DialogHeader>
              <Form id="login">
                <Form.Label>
                  Name: <Form.Text id="loginName" />
                </Form.Label>
                <Form.Label>
                  Password: <Form.Password id="loginPass" />
                </Form.Label>
                <DialogFooter>
                  <div className="flex justify-end gap-2 mt-2">
                    <DialogClose asChild>
                      <Button type="button" variant='destructive'>Close</Button>
                    </DialogClose>
                    <Button type="submit" variant='outline'>Login</Button>
                  </div>
                </DialogFooter>
              </Form>
            </DialogContent>
          </Dialog>

          <Dialog open={isRegisterOpen} onOpenChange={handleRegisterOpenChange}>
            <DialogTrigger className="underline px-2 hover:bg-indigo-200 rounded-lg">Create an account</DialogTrigger>
            <DialogContent className="max-w-xs sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Create an account</DialogTitle>
              </DialogHeader>
              <Form id="register">
                <Form.Label>
                  Name: <Form.Text id="userName" />
                </Form.Label>
                <Form.Label>
                  Password: <Form.Password id="password" />
                </Form.Label>
                <Form.Label>
                  <div className="w-full text-left mt-3">Profile Picture:</div> <Form.File id="pfp" />
                </Form.Label>
                <DialogFooter>
                  <div className="flex justify-end gap-2 mt-8">
                    <DialogClose asChild>
                      <Button type="button" variant='destructive'>Close</Button>
                    </DialogClose>
                    <Button type="submit" variant='outline' disabled={!profilesData.pfp}>Create</Button>
                  </div>
                </DialogFooter>
              </Form>
            </DialogContent>
          </Dialog>
        </div>}
        {loggedProfile && <div>
          <Button type='button' className="font-bold text-lg" variant='outline' onClick={() => logoff()}>Logoff</Button>
        </div>
        }
      </main>
    </>
  )
}

export default MainPage
