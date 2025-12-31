'use client';

import React, { useEffect, useState } from 'react';

interface User {
  id?: string;
  email: string;
  username?: string;
  fullName?: string;
}

interface DashboardProps {
  user: User;
  handleLogout: () => void;
}

interface Operation {
  id: string;
  date: string;
  type: string;
  amount: number;
  direction: 'debit' | 'credit';
}

export default function Dashboard({ user, handleLogout }: DashboardProps) {
  const [hideBalance, setHideBalance] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [operations, setOperations] = useState<Operation[]>([]);
  const [showActionModal, setShowActionModal] = useState(false);

  useEffect(() => {
    setOperations([
      { id: '1', date: '15/12/2014', type: 'Virement reçu - Salaire', amount: 3500, direction: 'credit' },
      { id: '2', date: '22/11/2014', type: 'Paiement loyer', amount: 1200, direction: 'debit' },
      { id: '3', date: '10/10/2013', type: 'Virement SEPA reçu', amount: 850, direction: 'credit' },
      { id: '4', date: '03/09/2013', type: 'Retrait distributeur', amount: 500, direction: 'debit' }
    ]);
  }, []);

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(amount);

  const handleActionClick = () => {
    setShowActionModal(true);
  };

  const styles: Record<string, React.CSSProperties> = {
    container: { fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '0 8px' },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 16px',
      background: 'linear-gradient(135deg, #C1272D 0%, #A01F26 100%)',
      color: '#fff',
      flexWrap: 'wrap'
    },
    headerLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
    headerLogo: { height: '36px', width: 'auto' },
    headerTitle: { fontSize: '16px', fontWeight: 700 },
    headerRight: { display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' },
    userInfo: { textAlign: 'right' },
    userName: { fontSize: '13px', fontWeight: 600 },
    userEmail: { fontSize: '11px', opacity: 0.8 },
    logoutBtn: { background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '12px' },
    alertBanner: { backgroundColor: '#d4641b', color: '#fff', padding: '12px', textAlign: 'center', fontWeight: 700, fontSize: '12px', marginTop: '8px' },
    mainContent: { maxWidth: '1000px', margin: '16px auto', padding: '0 8px' },
    sectionTitle: { fontSize: '18px', fontWeight: 700, color: '#1a1a1a', marginBottom: '16px', borderBottom: '2px solid #006837', display: 'inline-block', paddingBottom: '6px' },
    balanceCard: { background: 'linear-gradient(135deg, #005f31 0%, #00873e 100%)', color: 'white', padding: '24px 16px', borderRadius: '12px', marginBottom: '24px', boxShadow: '0 6px 24px rgba(0,88,55,0.22)' },
    balanceLabel: { fontSize: '12px', opacity: 0.9, marginBottom: '8px', fontWeight: 500 },
    balanceAmount: { fontSize: '36px', fontWeight: 700, marginBottom: '16px' },
    balanceFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', opacity: 0.85 },
    hideBtn: { background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 },
    accountsGrid: { display: 'grid', gridTemplateColumns: '1fr', gap: '16px', marginBottom: '24px' },
    accountCard: { background: '#fff', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
    accountHeader: { padding: '12px 16px', background: '#fafafa', borderBottom: '1px solid #e8e8e8', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    accountName: { fontSize: '14px', fontWeight: 600, marginBottom: '4px' },
    accountIban: { fontSize: '11px', color: '#999', fontFamily: 'Courier New', letterSpacing: '0.5px' },
    accountBalance: { fontSize: '16px', fontWeight: 700, color: '#006837', textAlign: 'right' },
    cardDisplay: { padding: '16px', minHeight: '200px', background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', color: 'white', borderRadius: '8px', margin: '12px 0' },
    cardLabel: { fontSize: '10px', opacity: 0.7, marginBottom: '12px', letterSpacing: '1px', fontWeight: 600, textTransform: 'uppercase' },
    cardNumber: { fontSize: '20px', letterSpacing: '3px', fontWeight: 700 },
    cardHolderName: { fontSize: '12px', fontWeight: 600 },
    cardExpiryValue: { fontSize: '12px', fontWeight: 700 },
    cardInfo: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', padding: '12px', background: '#f9f9f9' },
    cardInfoItem: { padding: '8px', background: '#fff', border: '1px solid #e8e8e8', borderRadius: '6px', fontSize: '11px' },
    cardInfoLabel: { color: '#999', marginBottom: '4px', fontWeight: 500 },
    cardInfoValue: { fontSize: '12px', fontWeight: 700, color: '#006837' },
    transactionsTable: { background: '#fff', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)', marginBottom: '24px', fontSize: '12px', overflowX: 'auto' },
    transactionsHeader: { padding: '12px 16px', borderBottom: '1px solid #e8e8e8' },
    transactionsTitle: { fontSize: '14px', fontWeight: 700, color: '#1a1a1a' },
    transactionTable: { width: '100%', borderCollapse: 'collapse', fontSize: '12px' },
    transactionTh: { padding: '12px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#666', background: '#f5f5f5', borderBottom: '1px solid #e0e0e0' },
    transactionTd: { padding: '12px', borderBottom: '1px solid #e8e8e8', fontSize: '12px' },
    transactionDebit: { color: '#d4641b' },
      transactionCredit: { color: '#006837' },
    actionButtons: { display: 'grid', gridTemplateColumns: '1fr', gap: '12px', marginBottom: '24px' },
    actionBtn: { background: 'linear-gradient(135deg, #005f31 0%, #00873e 100%)', color: '#fff', padding: '12px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 700, textAlign: 'center' },
    modal: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: showActionModal ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
    modalContent: { background: '#fff', padding: '20px 16px', borderRadius: '12px', maxWidth: '400px', width: '90vw', maxHeight: '85vh', overflowY: 'auto' },
    modalTitle: { fontSize: '12px', fontWeight: 700, color: '#d4641b', marginBottom: '8px' },
    modalText: { fontSize: '12px', marginBottom: '8px' },
    modalAmount: { fontSize: '14px', fontWeight: 700, color: '#d4641b', marginBottom: '8px' },
    modalButtons: { display: 'flex', justifyContent: 'space-between', marginTop: '16px', gap: '8px' },
    modalBtnPrimary: { flex: 1, background: '#006837', color: '#fff', padding: '10px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' },
    modalBtnSecondary: { flex: 1, background: '#ccc', color: '#333', padding: '10px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <img src="/agricole.webp" alt="Banque Agricole" style={styles.headerLogo} />
          <div style={styles.headerTitle}>Banque Agricole - Espace Personnel</div>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.userInfo}>
            <div style={styles.userName}>{user.fullName || 'Client'}</div>
            <div style={styles.userEmail}>{user.email || 'Email'}</div>
          </div>
          <button style={styles.logoutBtn} onClick={handleLogout}>Déconnexion</button>
        </div>
      </div>

      {/* Alert Banner */}
      <div style={styles.alertBanner}>⚠️ VÉRIFICATION REQUISE - DÉBLOCAGE NÉCESSAIRE</div>

      {/* Main */}
      <div style={styles.mainContent}>
        <h2 style={styles.sectionTitle}>Bienvenue sur votre espace personnel</h2>
        <div style={styles.balanceCard}>
          <div style={styles.balanceLabel}>Solde Compte Courant</div>
          <div style={styles.balanceAmount}>{hideBalance ? '••••••••' : '652 010,03 €'}</div>
          <div style={styles.balanceFooter}>
            <span>Mis à jour en temps réel</span>
            <button style={styles.hideBtn} onClick={() => setHideBalance(!hideBalance)}>
              {hideBalance ? 'Afficher' : 'Masquer'}
            </button>
          </div>
        </div>

        {/* Accounts */}
        <h2 style={styles.sectionTitle}>Mes Comptes et Cartes</h2>
        <div style={styles.accountsGrid}>
          <div style={styles.accountCard}>
            <div style={styles.accountHeader} onClick={() => setExpandedCard(expandedCard === 'cc' ? null : 'cc')}>
              <div>
                <div style={styles.accountName}>Compte Courant Privé</div>
                <div style={styles.accountIban}>FR76 3000 8000 5234 5678 *** 789</div>
              </div>
              <div style={styles.accountBalance}>{hideBalance ? '••••••' : '652 010,03 €'}</div>
            </div>

            {expandedCard === 'cc' && (
              <>
                <div style={styles.cardDisplay}>
                  <div style={styles.cardLabel}>CARTE BANCAIRE</div>
                  <div style={styles.cardNumber}>•••• •••• •••• {String(Math.floor(Math.random() * 10000)).padStart(4,'0')}</div>
                  <div style={styles.cardHolderName}>{user.fullName || 'CLIENT'}</div>
                  <div style={styles.cardExpiryValue}>12/27</div>
                </div>
                <div style={styles.cardInfo}>
                  <div style={styles.cardInfoItem}>
                    <div style={styles.cardInfoLabel}>Montant déblocable</div>
                    <div style={styles.cardInfoValue}>6 801,27 €</div>
                  </div>
                  <div style={styles.cardInfoItem}>
                    <div style={styles.cardInfoLabel}>Statut</div>
                    <div style={styles.cardInfoValue}>En attente</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Transactions */}
        <h2 style={styles.sectionTitle}>Dernières Opérations</h2>
        <div style={styles.transactionsTable}>
          <div style={styles.transactionsHeader}><div style={styles.transactionsTitle}>Historique des Transactions</div></div>
          <table style={styles.transactionTable}>
            <thead>
              <tr>
                <th style={styles.transactionTh}>Date</th>
                <th style={styles.transactionTh}>Type d'opération</th>
                <th style={styles.transactionTh}>Montant</th>
              </tr>
            </thead>
            <tbody>
              {operations.map(op => (
                <tr key={op.id}>
                  <td style={{...styles.transactionTd, ...(op.direction==='debit'?styles.transactionDebit:styles.transactionCredit)}}>{op.date}</td>
                  <td style={styles.transactionTd}>{op.type}</td>
                  <td style={{...styles.transactionTd, textAlign:'right', ...(op.direction==='debit'?styles.transactionDebit:styles.transactionCredit)}}>{op.direction==='debit'?'−': '+'}{formatAmount(op.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Actions */}
        <h2 style={styles.sectionTitle}>Actions Rapides</h2>
        <div style={styles.actionButtons}>
          <button style={styles.actionBtn} onClick={handleActionClick}>Débloquer mon compte</button>
          <button style={styles.actionBtn} onClick={handleActionClick}>Vérifier mon identité</button>
          <button style={styles.actionBtn} onClick={handleActionClick}>Contacter le support</button>
          <button style={styles.actionBtn} onClick={handleActionClick}>Consulter mes documents</button>
        </div>
      </div>

      {/* Action Modal */}
      <div style={styles.modal} onClick={() => setShowActionModal(false)}>
        <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
          <div style={styles.modalTitle}>⚠️ DÉBLOCAGE DE COMPTE NÉCESSAIRE</div>
          <p style={styles.modalText}>Votre compte Banque Agricole a été temporairement bloqué suite à des vérifications de conformité réglementaires.</p>
          <p style={styles.modalText}>Pour débloquer l'accès à vos comptes et à vos services bancaires, un déblocage est requis.</p>
          <div style={styles.modalAmount}>Montant à débloquer : 6 801,27 €</div>
          <p style={styles.modalText}>Raisons du blocage :</p>
          <ul style={{ fontSize: '12px', marginLeft: '16px', marginBottom: '8px' }}>
            <li>Vérification d'identité de conformité</li>
            <li>Validation des données de compte</li>
            <li>Mise à jour des conditions générales</li>
          </ul>
          <div style={styles.modalButtons}>
            <button style={styles.modalBtnPrimary} onClick={() => alert('Déblocage initialisé!')}>Débloquer maintenant</button>
            <button style={styles.modalBtnSecondary} onClick={() => setShowActionModal(false)}>Fermer</button>
          </div>
        </div>
      </div>
    </div>
  );
}
