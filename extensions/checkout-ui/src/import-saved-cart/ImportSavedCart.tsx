import { useState } from 'react';
import './ImportSavedCart.css';

interface ImportSavedCartProps {}

const ImportSavedCart: React.FC<ImportSavedCartProps> = () => {
	const [loggedInState, setLoggedInState] = useState<boolean>(true);
	const [buttonText, setButtonText] = useState('Retrieve Cart');
	const [backgroundColor, setBackgroundColor] = useState('#ffffff');

	return (
		<div className="import-saved-cart-container" style={{ backgroundColor }}>
			{loggedInState ? (
				<div>
					<p>Retrieve your saved cart</p>
					<button>{buttonText}</button>
				</div>
			) : (
				<div>
					<p>If you want to use this feature, please login.</p>
				</div>
			)}
		</div>
	);
};

export default ImportSavedCart;
