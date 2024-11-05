1. First signer 
- npm install
- Put private key and public key to env.
- run this cmd: node script1
- tx is stored in psbt.json
- delete keys in env and forward to second signer

2. Second signer
- npm install
- Put keys to env
- node script2
- psbt.json is updated 
- delete keys in env and forward to third signer

3. Third signer
- Repeat second signer's things

4. Forth signer
- Repeat second and third signer's things

5. Client to submit tx finally
- npm install
- just run; node script3