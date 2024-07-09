import jwt from 'jsonwebtoken';

console.clear();

// const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYWNrIiwiaWF0IjoxNzEwODE4NjQ4LCJleHAiOjE3MTA4MTk2NDh9.z0WSxctHTvinZXyaRB6zDtGlRs8wUT0PoEsID5Xa0AMKLe8vXMvLAdFtjYYGB8xhrm1QjTp79KdXKlxoQw53OQ';

export const test = () => {
	jwt.verify('jwt', 'jwtKey', (err, decoded) => {
		if (err) {
			// 驗證失敗
			console.error('JWT 驗證失敗:', err);
		} else {
			// 驗證成功，decoded 中包含了 JWT Token 的有效負載
			console.log('JWT 驗證成功:', decoded);
		}
	});
};
