import Card from "react-bootstrap/Card";

export default function LandingPage() {
  return (
    <Card style={{ margin: "2rem 4rem" }}>
      <Card.Img />
      <Card.Body>
        <Card.Title>Text Adventure Landing Page</Card.Title>
        <Card.Text>
      	  <p>Welcome Adventurers, to ***Text Adventure*** for educators and students! Enrich the learning experience 
		  with customized games for any topic or learning environment. All you need is an internet connection.</p>
		  
		  <p>Educators: Designed with you in mind, with ***Text Adventure*** you will create engaging 
		  and immersive learning experiences. Our intuitive platform lets you easily create, edit, and share
		  interactive games tailored to your curriculum.</p>

		  <p>Students: Sick of "whiteboard" Jeopardy?  Prepare for a truly immersive experience. Whether you're exploring
		  ancient civilizations, dissecting literary classics, or mastering mathematical concepts, ***Text Adventure*** allows 
		  you to absorb these concepts at your own pace, and while having fun. </p>
		  		  
		  <p>Dive into a world where learning meets adventure. Join the adventure!</p>
		</Card.Text>
      </Card.Body>
    </Card>
  );
}
