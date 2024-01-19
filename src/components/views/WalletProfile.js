import { Row, Col } from 'antd'
import { useState } from 'react'
import { AiOutlineKey } from 'react-icons/ai'
import WalletResetPasswordModal from '../component/WalletResetPasswordModal'
import { useTranslation } from 'react-i18next'

function WalletProfile() {
  const [t, i18n] = useTranslation()
  const [use, setUser] = useState(JSON.parse(localStorage.getItem('userInfo')))
  const [showModal, setShowModal] = useState(false)
  return (
    <Col span={22} offset={1} className='mt-8 myColor1 text-sm'>
      <Row>
        <Col span={20}>{t('Email Address')}</Col>
        <Col span={4} className='text-center text-overflow'>
          {t('Edit Password')}
        </Col>
      </Row>

      <Row className='text-lg font-bold'>
        <Col span={20}>{t(use.email)}</Col>
        <Col span={4} className='text-center'>
          <button onClick={() => setShowModal(true)}>
            <AiOutlineKey size={20} className='inline mr-2' />
          </button>
          {/* Duclair: Anchor used as a button. Anchors are primarily expected to navigate. Use the button element instead. */}
        </Col>
      </Row>

      {showModal ? (
        <WalletResetPasswordModal
          setModalShow={setShowModal}
          title='Reset Password'
        />
      ) : null}
    </Col>
  )
}

export default WalletProfile
