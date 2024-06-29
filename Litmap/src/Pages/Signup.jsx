import React, { useState } from 'react';
import styled from 'styled-components';

const SignupContainer = styled.div`
    margin-top: 50px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;


const SignupPage = () => {
    const [showSignupForm, setShowSignupForm] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [businessNumber, setBusinessNumber] = useState('');
    const [isIndividualAuthor, setIsIndividualAuthor] = useState(false);
    const [representativeName, setRepresentativeName] = useState('');
    const [representativeNameSecond, setRepresentativeNameSecond] = useState('');
    const [isCoOwner, setIsCoOwner] = useState(false);
    const [publisherName, setPublisherName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [publishingField, setPublishingField] = useState('');
    const [isSpoilerNoticeConfirmed, setIsSpoilerNoticeConfirmed] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleSignupButtonClick = () => {
        setShowSignupForm(true);
    };

    return (
        <SignupContainer>
            <h1>회원가입</h1>
            {!showSignupForm && (
                <button onClick={handleSignupButtonClick}>회원가입</button>
            )}
            {showSignupForm && (
                <form onSubmit={handleSubmit}>
                    <FormField>
                        <label>
                            아이디(이메일):
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                    </FormField>

                    <FormField>
                        <label>
                            비밀번호:
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                    </FormField>

                    <FormField>
                        <label>
                            비밀번호 재입력:
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </label>
                    </FormField>

                    <FormField>
                        <label>
                            닉네임(국문/영문 8자):
                            <input
                                type="text"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                maxLength={8}
                                required
                            />
                        </label>
                    </FormField>

                    <FormField>
                        <label>
                            프로필이미지:
                            <input
                                type="file"
                                onChange={(e) => setProfileImage(e.target.files[0])}
                            />
                        </label>
                    </FormField>

                    <FormField>
                        <label>
                            사업자번호(10자리):
                            <input
                                type="text"
                                value={businessNumber}
                                onChange={(e) => setBusinessNumber(e.target.value)}
                                maxLength={10}
                                required={!isIndividualAuthor}
                            />
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isIndividualAuthor}
                                    onChange={(e) => setIsIndividualAuthor(e.target.checked)}
                                />
                                사업자 없는 경우(1인작가)
                            </label>
                        </label>
                    </FormField>

                    <FormField>
                        <label>
                            대표자명(국문/영문):
                            <input
                                type="text"
                                value={representativeName}
                                onChange={(e) => setRepresentativeName(e.target.value)}
                                required
                            />
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isCoOwner}
                                    onChange={(e) => setIsCoOwner(e.target.checked)}
                                />
                                공동인 경우 체크
                            </label>
                        </label>
                    </FormField>

                    {isCoOwner && (
                        <FormField>
                            <label>
                                대표자명(국문/영문) 2:
                                <input
                                    type="text"
                                    value={representativeNameSecond}
                                    onChange={(e) => setRepresentativeNameSecond(e.target.value)}
                                    required
                                />
                            </label>
                        </FormField>
                    )}

                    <FormField>
                        <label>
                            출판사명(국문/영문):
                            <input
                                type="text"
                                value={publisherName}
                                onChange={(e) => setPublisherName(e.target.value)}
                                required
                            />
                        </label>
                    </FormField>

                    <FormField>
                        <label>
                            주소:
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </label>
                    </FormField>

                    <FormField>
                        <label>
                            대표 전화번호:
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </label>
                    </FormField>

                    <FormField>
                        <label>
                            출판사 분야:
                            <select
                                value={publishingField}
                                onChange={(e) => setPublishingField(e.target.value)}
                                required
                            >
                                <option value="">선택</option>
                                <option value="문학">문학</option>
                                <option value="경제/경영">경제/경영</option>
                                <option value="IT/기술">IT/기술</option>
                                <option value="기타">기타</option>
                            </select>
                        </label>
                    </FormField>

                    <FormField>
                        <label>
                            <input
                                type="checkbox"
                                checked={isSpoilerNoticeConfirmed}
                                onChange={(e) => setIsSpoilerNoticeConfirmed(e.target.checked)}
                                required
                            />
                            스포일러 관련공지(필수 확인)
                        </label>
                    </FormField>

                    <button type="submit">회원가입</button>
                </form>
            )}
        </SignupContainer>
    );
};

export default SignupPage;