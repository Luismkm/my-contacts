import { useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

export default function useEditContact() {
  const [isLoading, setIsLoading] = useState(true)
  const [contactName, setContactName] = useState('')

  const contactFormRef = useRef(null)
  const { id } = useParams()
  const history = useHistory()
  const safeAsyncAction =  useSafeAsyncAction()


  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(id)

        safeAsyncAction(() => {
          contactFormRef.current.setFieldsValues(contact)
          setIsLoading(false)
          setContactName(contact.name)
        })
      } catch (error) {
        safeAsyncAction(() => {
          history.push('/')
          toast({
            type: 'danger',
            text: 'Contato não encontrado!'
          })
        })
      }
    }
    loadContact()
  },[id, history, safeAsyncAction])

  async function handleSubmit(contact) {
    try {
      const updatedData = await ContactsService.updateContact(id, contact)

      setContactName(updatedData.name)

      toast({
        type: 'success',
        text: 'Contato editado com sucesso!',
      })
    } catch (error) {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato!',
      })
    }
  }

  return {
    isLoading,
    contactName,
    contactFormRef,
    handleSubmit
  }
}
