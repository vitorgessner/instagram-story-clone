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
import Form, { type FormValues } from "../components/Form/Form"
import { useState } from "react"
import useProfileStore from "../store/profileStore"
import useStoriesStore from "../store/storiesStore"
import { ValidationError } from "../utils/ValidationError"
import { useNavigate } from "react-router"
import type { UseFormReturn } from "react-hook-form"
import type { LoginFormI, RegisterFormI } from "../types/profileTypes"

function MainPage() {
  const {
    loggedProfile,
    logoff,
    login,
    addProfile,
  } = useProfileStore();
  const { addToStories } = useStoriesStore();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAddStoryOpen, setIsAddStoryOpen] = useState(false);

  const navigate = useNavigate();

  const handleLoginOpenChange = (isOpen: boolean) => {
    setIsLoginOpen(isOpen)
  }

  const handleRegisterOpenChange = (isOpen: boolean) => {
    setIsRegisterOpen(isOpen)
  }

  const handleAddStoryOpenChange = (isOpen: boolean) => {
    setIsAddStoryOpen(isOpen)
  }

  const handleStory = async (methods: UseFormReturn<FormValues, unknown, FormValues>, data: FormValues) => {
    try {
      if (!loggedProfile) return;
      const newStory = await addToStories(loggedProfile.id, data);
      if (!newStory) return null;

      setIsAddStoryOpen(false);

      await navigate(`/stories/${loggedProfile.username}/${newStory.id}`)
    } catch (error) {
      if (error instanceof ValidationError) {
        return methods.setError('image', error)
      }
      return console.error('Unexpected error: ' + error)
    }
  }

  const handleLogin = async (methods: UseFormReturn<FormValues, unknown, FormValues>, data: FormValues) => {
    try {
      if (!data.username || !data.password) throw new Error('Invalid data');
      const loginData : LoginFormI = {username: data.username, password: data.password}
      const logged = await login(loginData);
      if (!logged) return null;
    } catch (error) {
      if (error instanceof ValidationError) {
        return methods.setError('password', error)
      }
      return console.error('Unexpected error: ' + error)
    }
  }

  const handleRegister = async (methods: UseFormReturn<FormValues, unknown, FormValues>, data: FormValues) => {
    try {
      if (!data.username || !data.password || !data.image) throw new Error("Invalid data")
      const registerData : RegisterFormI = {username: data.username, password: data.password, image: data.image}
      await addProfile(registerData);
    } catch(error) {
      if (error instanceof ValidationError) {
        return methods.setError('image', error);
      }
      return console.error('Unexpected error: ' + error)
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
                  <Form onSubmit={handleStory}>
                    <Form.File />
                    <DialogFooter>
                      <div className="flex justify-end gap-2 mt-2">
                        <DialogClose asChild>
                          <Button type="button" variant='destructive'>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="disabled:bg-zinc-300 disabled:cursor-none disabled:pointer-events-none" variant='outline' >Post</Button>
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
              <Form onSubmit={handleLogin}>
                <Form.Label>
                  Name: <Form.Text />
                </Form.Label>
                <Form.Label>
                  Password: <Form.Password />
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
              <Form onSubmit={handleRegister}>
                <Form.Label>
                  Name: <Form.Text />
                </Form.Label>
                <Form.Label>
                  Password: <Form.Password />
                </Form.Label>
                <Form.Label>
                  <div className="w-full text-left mt-3">Profile Picture:</div> <Form.File />
                </Form.Label>
                <DialogFooter>
                  <div className="flex justify-end gap-2 mt-8">
                    <DialogClose asChild>
                      <Button type="button" variant='destructive'>Close</Button>
                    </DialogClose>
                    <Button type="submit" variant='outline'>Create</Button>
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
