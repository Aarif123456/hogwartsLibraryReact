import React from 'react';
import './App.css';
import Header from './Header';

export function AboutUs() {
    return (
        <>
            <Header />
            <div className='App'>
                <div className='App-body'>
                    <h3 className='App-header'>About Hogwarts</h3>
                    <p>
                        Hogwarts School of Witchcraft and Wizardry is a British school created to nurture the mind of young witches and
                        wizards. One of the problems young sorcerers have is that they don't know how to control the power within
                        themselves. Furthermore, they usually end up ostracized in muggle communities. This often resulted in young wizards
                        and witches who engaged in criminal behaviour. Which further solidifies the hates that muggles have for our kind. To
                        fight this vicious cycle, four great wizards and witches created Hogwarts as a place where wizards and witches will
                        feel they belong and can fulfill their potential. Furthermore, each of the founders created a house within the
                        school to embody their personality. First, Godric Gryffindor the greatest duelist of his age, created house
                        Gryffindor. He selected students based on their bravery, determination and strength of heart. Next, Rowena Ravenclaw
                        who wanted the cultivate the most brilliant and creative students. She believed that the strength of the mind was
                        the greatest quality any living being could possess. As such, she believed that by cultivating intelligent students,
                        she would create a group of graduates who would make the largest difference in the world. Third, we have Salazar
                        Slytherin who believed that above all people should cultivate power and freedom. He selected students who were
                        ambitious, resourceful and a certain disregard for the rule. Unfortunately, Salazar was also a racist who believed
                        that blood purity was important in wizards and witches. As a result, he tried to make Hogwarts a place that only
                        takes in people who come from a family of magic. Fortunately, the other founders disagreed as this went against
                        their mission of creating an inclusive place for wizards and witches. Lastly, we have Helga Hufflepuff who took the
                        inclusiveness to another level. She believed that all children should be treated equally and she believed that the
                        most important quality in any person is loyalty and grit. As a result, she would accept any student who wanted to be
                        in Hufflepuff as long they were willing to put in the effort
                    </p>
                    <h3 className='App-header'>About the site</h3>
                    <p>
                        As a school Hogwarts tries to get as many different sources of knowledge as possible. As such, our library grew to
                        an unmanageable size. To handle the situation some young wizards proposed that Hogwarts should try to incorporate a
                        muggle technology to implement an online management system. As a result, this website was created. This system gives
                        different privileges to different types of users. So, anyone can see the cumulative fines that each house has racked
                        up. But, only a student of professor at Hogwarts will be able to view what books they have signed out.{' '}
                    </p>
                </div>
            </div>
        </>
    );
}
